const db = require('../../../data/models')('book');

const getWithPublisher = () => {
  return db.cb(async (db) => {
    const books = await db('book')
      .select([
        'book.id',
        'book.title',
        'book.isbn',
        'book.cover',
        'book.thumbnail',
        'book.description',
        'publisher.name as publisher',
      ])
      .avg('review.rating as averageRating')
      .count('review.rating as totalRatings')
      .groupBy('book.id', 'publisher.name')
      .leftOuterJoin('publisher', {
        'book.publisher_id': 'publisher.id',
      })
      .leftOuterJoin('review', {
        'book.id': 'review.book_id',
      });
    return books.map(book => ({
      ...book,
      averageRating: book.averageRating ? Number(book.averageRating.toFixed(2)) : null,
    }));
  });
};

const hydrateBook = async (id) => {
  return db.cb(async (db) => {
    const book = await db('book')
    .select([
      'book.id',
      'book.title',
      'book.isbn',
      'book.cover',
      'book.thumbnail',
      'book.description',
      'publisher.name as publisher',
    ])
    .where({ 'book.id': id })
    .leftOuterJoin('publisher', {
      'book.publisher_id': 'publisher.id',
    }).first();

    const authors = await db('book_author')
      .select([
        'author.id',
        'author.name',
      ])
      .where({ book_id: id })
      .leftOuterJoin('author', { 'author.id': 'book_author.author_id' });
      // .reduce((acc, { name }) => [...acc, name], []);
    
      const reviews = await db('review')
      .select([
        'review.id as id',
        'user.username',
        'review.rating',
        'review.review',
      ])
      .where({ 'review.book_id': id })
      .leftOuterJoin('user', {
        'user.id': 'review.user_id',
      });

    const categories = await db('category')
      .select([
        'category.id',
        'category.name'
      ])
      .leftOuterJoin('book_category', { 'book_category.category_id': 'category.id' })
      .where('book_category.book_id', id);

    return {
      ...book,
      authors,
      averageRating: Number((reviews.reduce((accumulator, current) => accumulator + current.rating, 0) / reviews.length).toFixed(2)),
      totalReviews: reviews.length,
      reviews,
      categories,
    };
  });
};

const getAuthorBooks = async (id) => {
  return db.cb(async (db) => {
    const books = await db('book')
      .select([
        'book.id',
        'book.title',
        'book.isbn',
        'book.cover',
        'book.thumbnail',
      ])
      .avg('review.rating as averageRating')
      .groupBy(
        'book.id',
        'book.title',
        'book.isbn',
        'book.cover',
        'book.thumbnail'
      )
      .leftOuterJoin('book_author', { 'book_author.book_id': 'book.id' })
      .leftOuterJoin('review', { 'review.book_id': 'book.id' })
      .where({ 'book_author.author_id': id });
    return books.map(book => ({
      ...book,
      averageRating: book.averageRating ? Number(book.averageRating.toFixed(2)) : null,
    }));
  });
}

const getCategoryBooks = async (id) => {
  return db.cb(async (db) => {
    const books = await db('book')
      .select([
        'book.id',
        'book.title',
        'book.isbn',
        'book.cover',
        'book.thumbnail',
      ])
      .avg('review.rating as averageRating')
      .groupBy(
        'book.id',
        'book.title',
        'book.isbn',
        'book.cover',
        'book.thumbnail'
      )
      .leftOuterJoin('book_category', { 'book_category.book_id': 'book.id' })
      .leftOuterJoin('review', { 'review.book_id': 'book.id' })
      .where({ 'book_category.category_id': id });
    return books.map(book => ({
      ...book,
      averageRating: book.averageRating ? Number(book.averageRating.toFixed(2)) : null,
    }));
  });
}

const addBook = (data) => {
  return db.cb(async (db) => {

    console.log(data);

    const publisherExists = await db('publisher').where({ name: data.publisher }).first();
    const publisherId = (publisherExists ? [publisherExists.id] : await db('publisher').insert({ name: data.publisher }))[0];

    const authorIds = await Promise.all(data.authors.map(async (name) => {
      const authorExists = await db('author').where({ name }).first();
      return (authorExists ? [authorExists.id] : await db('author').insert({ name }))[0];
    }));

    const categoryIds = await Promise.all(data.categories.map(async (name) => {
      const categoryExists = await db('category').where({ name }).first();
      return (categoryExists ? [categoryExists.id] : await db('category').insert({ name }))[0];
    }));

    const bookId = await db('book').insert({
      title: data.title,
      isbn: data.isbn,
      cover: `https://books.google.com/books/content?id=${data.gid}&printsec=frontcover&img=1&zoom=3`,
      thumbnail: `https://books.google.com/books/content?id=${data.gid}&printsec=frontcover&img=1&zoom=2`,
      description: data.description,
      publisher_id: publisherId,
    });
    
    await Promise.all(
      authorIds.map(async (authorId) => {
        return await db('book_author').insert({
          book_id: bookId[0],
          author_id: authorId,
        });
      }),
      categoryIds.forEach(async (categoryId) => {
        return await db('book_category').insert({
          book_id: bookId[0],
          category_id: categoryId,
        });
      })
    );
    return data;
  });
};

module.exports = {
  ...db,
  getWithPublisher,
  getAuthorBooks,
  getCategoryBooks,
  hydrateBook,
  addBook,
};

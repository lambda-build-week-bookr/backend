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
        'author.name',
      ])
      .where({ book_id: id })
      .leftOuterJoin('author', { 'author.id': 'book_author.author_id' })
      .reduce((acc, { name }) => [...acc, name], []);
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
    return {
      ...book,
      authors,
      averageRating: Number((reviews.reduce((accumulator, current) => accumulator + current.rating, 0) / reviews.length).toFixed(2)),
      totalReviews: reviews.length,
      reviews,
    };
  });
}

module.exports = {
  ...db,
  getWithPublisher,
  hydrateBook,
};
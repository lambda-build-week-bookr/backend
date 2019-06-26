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
      .leftOuterJoin('publisher', {
        'book.publisher_id': 'publisher.id',
      });
    return books;
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
    return {
      ...book,
      authors,
    };
  });
}

module.exports = {
  ...db,
  getWithPublisher,
  hydrateBook,
};
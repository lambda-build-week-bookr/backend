const parser = require('../../utils/parser');

exports.seed = async (knex) => {
  // wait for our parser to pull data from Google Books API
  const physics = await parser('physics');
  const math = await parser('mathematics');

  const booksRaw = [
    ...physics,
    ...math,
  ];

  const authors = [
    ...new Set([
      ...booksRaw.reduce((accumulator, { authors }) => {
        if (authors) authors.forEach(name => accumulator.push(name));
        return accumulator;
      }, []),
    ])
  ];

  const publishers = [
    ...new Set([
      ...booksRaw.reduce((accumulator, { publisher }) => [ ...accumulator, publisher ], []),
    ])
  ];

  // get id list of isbn13 for book_author insert
  const isbnList = [
    ...booksRaw.reduce((accumulator, { identifiers: { isbn13: isbn } }) => [ ...accumulator, isbn ], []),
  ];

  const books = [
    ...booksRaw.map(({
        title,
        identifiers: { isbn13: isbn },
        publisher,
        cover,
        thumbnail,
        description,
      }) => ({
        title,
        isbn,
        cover,
        thumbnail,
        description,
        publisher_id: publishers.indexOf(publisher) + 1,
    })),
  ];

  const bookAuthors = booksRaw.reduce((accumulator, { identifiers: { isbn13: isbn }, authors: authorList }) => [
    ...accumulator,
    ...authorList.map(author => ({
        book_id: isbnList.indexOf(isbn) + 1,
        author_id: authors.indexOf(author) + 1,
      })
    ),
  ], []);

  await knex('author').insert(authors.map(name => ({name})));
  await knex('publisher').insert(publishers.map(name => ({name})));
  await knex('book').insert(books);
  await knex('book_author').insert(bookAuthors);
};

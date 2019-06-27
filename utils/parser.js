const axios = require('axios');

const key = process.env.BOOK_KEY;

// Parses google books data
const parser = async (subject) => {
  // book endpoint https://www.googleapis.com/books/v1/volumes?q=physics
  // image endpoint https://books.google.com/books/content?id=uSPzV9R08nsC&printsec=frontcover&img=1&zoom=3

  const volumes = `https://www.googleapis.com/books/v1/volumes?q=${subject}`;
  const { data: { items } } = await axios.get(volumes);
  const books = items.map(({ id, volumeInfo }) => {
    const {
      title,
      authors,
      publisher,
      publishedDate,
      description,
      industryIdentifiers,
      pageCount,
      categories,
      language,
    } = volumeInfo;
    const identifiers = {};

    if (industryIdentifiers) {
      industryIdentifiers.forEach(isbn => {
        if (isbn.type === 'ISBN_10') {
          identifiers.isbn10 = isbn.identifier;
        } else {
          identifiers.isbn13 = isbn.identifier;
        }
      });
    }

    return {
      title,
      authors,
      identifiers,
      publisher: publisher || 'Unknown',
      cover: `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=3`,
      thumbnail: `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=2`,
      description,
      categories,
      pageCount,
      publishedDate,
      language,
    };
  }).filter(book => book.description);

  return books;
}

module.exports = parser;

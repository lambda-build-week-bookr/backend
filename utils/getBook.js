require('dotenv').config();
const axios = require('axios').create({
  headers: {'key': process.env.API_KEY}
});

// Parses google books data
const getBook = async (id) => {
  // book endpoint https://www.googleapis.com/books/v1/volumes?q=physics
  // image endpoint https://books.google.com/books/content?id=uSPzV9R08nsC&printsec=frontcover&img=1&zoom=3


  // TODO Split categories by / E.g. "Mathematics / History" > categories [ "Mathematics", "History" ]

  const bookQuery = `https://www.googleapis.com/books/v1/volumes/${id}`;
  const {
    data: {
      volumeInfo: {
        title,
        authors,
        publisher,
        publishedDate,
        description,
        industryIdentifiers,
        imageLinks: { small: thumbnail, medium: cover },
        pageCount,
        categories,
        language,
      }
    }
  } = await axios.get(bookQuery);

  const isbn = industryIdentifiers && industryIdentifiers.filter(identifier => identifier.type === 'ISBN_13')[0].identifier;

  const book = {
    gid: id,
    title,
    authors,
    publisher,
    publishedDate,
    description,
    isbn,
    thumbnail,
    cover,
    pageCount,
    categories: categories ? [ categories[0].split(' / ')[0] ] : [ "Unknown" ],
    language,
  };

  return book;
}

module.exports = getBook;

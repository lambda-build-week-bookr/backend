// GET / return list of books
// GET /:id return single book

const express = require('express');

const router = express.Router();
const db = require('./book.model');
const auth = require('../../middleware/auth');
const log = require('../../../utils/logger');

router.use(auth);

/**
 * @api {get} /books Get a list of books
 * @apiName BookList
 * @apiGroup Books
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {array} books A list of books.
 * @apiSuccess {integer} book.id The book id.
 * @apiSuccess {string} book.title The book title.
 * @apiSuccess {string} book.isbn The 10 digit ISBN.
 * @apiSuccess {string} book.publisher The name of the publishing company.
 * @apiSuccess {string} book.cover A URL with a cover image for the book.
 * @apiSuccess {string} book.edition A short string regarding the edition of the book.
 * @apiSuccess {string} book.description A long string with the books summary/description.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "books": [
 *        {
 *          "id": 1,
 *          "title": "Book Title",
 *          "isbn": "1234567890",
 *          "publisher": "Publisher Name",
 *          "cover": "https://link.to/image.png",
 *          "edition": "5th Edition",
 *          "description": "This is a generic book description.",
 *        },
 *      ],
 *    }
 *
 * @apiUse MissingAuth
 * @apiUse InvalidCreds
 * 
 */
router.get('/', async (req, res) => {
  try {
    const books = await db.get();
    res.json({
      status: 'success',
      books,
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

/**
 * @apiIgnore Not implemented yet.
 * @api {get} /books/:id Get a book by id
 * @apiName Book
 * @apiGroup Books
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {object} book A book with the requested id.
 * @apiSuccess {integer} book.id The book id.
 * @apiSuccess {string} book.title The book title.
 * @apiSuccess {string} book.isbn The 10 digit ISBN.
 * @apiSuccess {string} book.publisher The name of the publishing company.
 * @apiSuccess {string} book.cover A URL with a cover image for the book.
 * @apiSuccess {string} book.edition A short string regarding the edition of the book.
 * @apiSuccess {string} book.description A long string with the books summary/description.
 * @apiSuccess {array} book.reviews An array of reviews for the book.
 * @apiSuccess {string} book.reviews.id The review id.
 * @apiSuccess {string} book.reviews.username Username of the reviewer.
 * @apiSuccess {float} book.reviews.rating Star rating (1-5) of the review.
 * @apiSuccess {string} book.reviews.review Body content of the review.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *      "status": "success",
 *      "book": {
 *        "id": 1,
 *        "title": "Book Title",
 *        "isbn": "1234567890",
 *        "publisher": "Publisher Name",
 *        "cover": "https://link.to/image.png",
 *        "edition": "5th Edition",
 *        "description": "This is a generic book description.",
 *        "authors": ["John R. Taylor"],
 *        "reviews": [
 *          {
 *            "id": 1,
 *            "username": "theProf",
 *            "rating": 5.0,
 *            "review": "This book is the GOAT. I consistently recommend it to both students and professors!",
 *          },
 *        ],
 *      },
 *    }
 *
 * @apiUse MissingAuth
 * @apiUse InvalidCreds
 * 
 * @apiError NotFound Requested resource was not found.
 * @apiErrorExample NotFound-Response
 *  HTTP/1.1 404 Not Found
 *    {
 *      "status": "error",
 *      "error": "NotFound",
 *      "message": "No resource was found with the requested id",
 *    }
 * 
 */

module.exports = router;

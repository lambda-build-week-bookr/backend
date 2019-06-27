const express = require('express');

const router = express.Router();
const db = require('./book.model');
const authorDB = require('../../../data/models')('author');

const auth = require('../../middleware/auth');
const access = require('../../middleware/access');
const validateId = require('../../middleware/validateId');
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
 * @apiSuccess {string} book.cover A URL with a cover image for the book.
 * @apiSuccess {string} book.thumbnail A URL with a thumbnail image for the book.
 * @apiSuccess {string} book.description A long string with the books summary/description.
 * @apiSuccess {string} book.publisher The name of the publishing company.
 * @apiSuccess {float} book.averageRating Average rating for this book.
 * @apiSuccess {integer} book.totalRatings The total number of ratings for this book.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "books": [
 *         {
 *           "id": 1,
 *           "title": "The Math Book",
 *           "isbn": "9781402757969",
 *           "cover": "https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=3",
 *           "thumbnail": "https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=2",
 *           "description": "This book covers 250 milestones in mathematical history, beginning millions of years ago with ancient \"ant odometers\" and moving through time to our modern-day quest for new dimensions.",
 *           "publisher": "Sterling Publishing Company, Inc."
 *           "averageRating" 3.45,
 *           "totalRatings": 2,
 *         },
 *       ]
 *     }
 *
 * @apiUse MissingAuth
 * @apiUse InvalidCreds
 * 
 */
router.get('/', async (req, res) => {
  try {
    const books = await db.getWithPublisher();
    res.json({
      status: 'success',
      books,
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

/**
 * @api {get} /books/author/:author_id Get books by author
 * @apiName AuthorBooks
 * @apiGroup Books
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {array} books A list of books by the author id.
 * @apiSuccess {integer} book.id The book id.
 * @apiSuccess {string} book.title The book title.
 * @apiSuccess {string} book.isbn The 10 digit ISBN.
 * @apiSuccess {string} book.cover A URL with a cover image for the book.
 * @apiSuccess {string} book.thumbnail A URL with a thumbnail image for the book.
 * @apiSuccess {float} book.averageRating Average rating for this book.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "books": [
 *         {
 *           "id": 1,
 *           "title": "The Math Book",
 *           "isbn": "9781402757969",
 *           "cover": "https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=3",
 *           "thumbnail": "https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=2",
 *           "averageRating" 3.45,
 *         },
 *       ]
 *     }
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
 *      "message": "No resource was found with the requested id (23)",
 *    }
 */
router.get('/author/:id', validateId(authorDB), async (req, res) => {
  try {
    const books = await db.getAuthorBooks(req.params.id);
    res.json({
      status: 'success',
      books,
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

/**
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
 * @apiSuccess {string} book.cover A URL with a cover image for the book.
 * @apiSuccess {string} book.description A long string with the books summary/description.
 * @apiSuccess {string} book.publisher The name of the publishing company.
 * @apiSuccess {array} book.authors A list of authors.
 * @apiSuccess {array} book.reviews An array of reviews for the book.
 * @apiSuccess {string} book.reviews.id The review id.
 * @apiSuccess {string} book.reviews.username Username of the reviewer.
 * @apiSuccess {float} book.reviews.rating Star rating (1-5) of the review.
 * @apiSuccess {string} book.reviews.review Body content of the review.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "book": {
 *         "id": 12,
 *         "title": "Mathematics",
 *         "isbn": "9780393040029",
 *         "cover": "https://books.google.com/books/content?id=E09fBi9StpQC&printsec=frontcover&img=1&zoom=3",
 *         "thumbnail": "https://books.google.com/books/content?id=E09fBi9StpQC&printsec=frontcover&img=1&zoom=2",
 *         "description": "Traces the history of mathematics and numeration, and reviews symbolic logic, set theory, series, equations, functions, geometry, trigonometry, vector analysis, fractals, matrices, calculus, probability theory, and differential equations",
 *         "publisher": "W. W. Norton & Company",
 *         "authors": [
 *           "Jan Gullberg",
 *           "Peter Hilton"
 *         ],
 *         "averageRating": 1.5,
 *         "totalReviews": 1,
 *         "reviews": [
 *           {
 *             "id": 13,
 *             "username": "admin",
 *             "rating": 1.5,
 *             "review": "I've read better"
 *           }
 *         ]
 *       }
 *     }
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
router.get('/:id', validateId(db), async (req, res) => {
  try {
    const book = await db.hydrateBook(req.resource.id);
    res.json({
      status: 'success',
      book,
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

/**
 * @api {get} /books/author/:author_id Get books by author
 * @apiName AuthorBooks
 * @apiGroup Books
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {array} books A list of books by the author id.
 * @apiSuccess {integer} book.id The book id.
 * @apiSuccess {string} book.title The book title.
 * @apiSuccess {string} book.isbn The 10 digit ISBN.
 * @apiSuccess {string} book.cover A URL with a cover image for the book.
 * @apiSuccess {string} book.thumbnail A URL with a thumbnail image for the book.
 * @apiSuccess {float} book.averageRating Average rating for this book.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "message": "Successfully delete a book with the id of (1)",
 *       "book": {
 *         "id": 1,
 *         "title": "The Math Book",
 *         "isbn": "9781402757969",
 *         "cover": "https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=3",
 *         "thumbnail": "https://books.google.com/books/content?id=JrslMKTgSZwC&printsec=frontcover&img=1&zoom=2",
 *         "description": "This book covers 250 milestones in mathematical history, beginning millions of years ago with ancient \"ant odometers\" and moving through time to our modern-day quest for new dimensions.",
 *       }
 *     }
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
 *      "message": "No resource was found with the requested id (23)",
 *    }
 */
router.delete('/:id', validateId(db), access('admin'), async (req, res) => {
  const { id, title, isbn, cover, thumbnail, description } = req.resource;
  try {
    await db.remove(req.resource.id);
    res.json({
      status: 'success',
      message: `Successfully delete a book with the id of (${id})`,
      book: {
        id,
        title,
        isbn,
        cover,
        thumbnail,
        description,
      },
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

module.exports = router;

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const db = require('./book.model');
const reviewDB = require('../Review/review.model');
const auth = require('../../middleware/auth');
const access = require('../../middleware/access');
const validateId = require('../../middleware/validateId');
const validateBody = require('../../middleware/validateBody');
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
    const books = await db.getWithPublisher();
    res.json({
      status: 'success',
      books,
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

//TODO: GET /authors/:id
router.get('/author/:id', async (req, res) => {
  res.json({
    message: "Route coming soon.",
  });
});

const reviewBody = {
  rating: {
    required: true,
    type: 'number',
  },
  review: {
    required: false,
    type: 'string',
  },
};

router.post('/:id/reviews', validateId(db), validateBody(reviewBody), async (req, res) => {
  const { id: book_id } = req.resource;
  const { authorization } = req.headers;
  const { subject: user_id } = jwt.decode(authorization);
  try {
    // decode jwt for user id
    await reviewDB.add({
      ...req.body,
      book_id,
      user_id,
    });
    res.json({
      status: 'success',
      message: `Successfully add a review to book with id ${book_id}`,
      review: {
        rating: req.body.rating,
        content: req.body.review,
      },
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
})


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

router.delete('/:id', validateId(db), access('admin'), async (req, res) => {
  try {
    await db.remove(req.resource.id);
    res.json({
      status: 'success',
      message: `Successfully delete a book with the id of (${req.resource.id})`,
      book: req.resource,
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

module.exports = router;

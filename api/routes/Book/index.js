// GET / return list of books
// GET /:id return single book

const express = require('express');

const router = express.Router();
const db = require('./book.model');
const auth = require('../../middleware/auth');
const log = require('../../../utils/logger');

router.use(auth);

/**
 * @api {get} /books Gets a list of books
 * @apiName BookList
 * @apiGroup Books
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {array} books A list of books.
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

module.exports = router;

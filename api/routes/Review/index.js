const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const db = require('./review.model');
const bookDB = require('../Book/book.model');

const auth = require('../../middleware/auth');
const validateId = require('../../middleware/validateId');
const validateBody = require('../../middleware/validateBody');
const log = require('../../../utils/logger');

router.use(auth);

const reviewBody = {
  rating: {
    required: true,
    type: 'number',
    regex: /^[0-5]\.[0-9]/g,
  },
  review: {
    required: false,
    type: 'string',
  },
};

/**
 * @api {post} /reviews/:book_id Create a review
 * @apiName Create Review
 * @apiGroup Reviews
 * @apiDescription NOTE: This request ID is the id of the book you want to add the review to
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 * @apiParam {float} rating The user's rating for the book.
 * @apiParam {string} [review] The user's optional review content for the given book.
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Informative message indicating action(s) taken.
 * @apiSuccess {array} review A review with the requested id.
 * @apiSuccess {integer} review.id The review id.
 * @apiSuccess {float} reviews.rating Star rating (1-5) of the review.
 * @apiSuccess {string} review.content Body content of the review.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "message": "Successfully added a review to book with id (4)",
 *       "review": {
 *         "id": 14,
 *         "rating": 1.5,
 *         "content": "I've read better"
 *       }
 *     }
 *
 * @apiUse MissingAuth
 * @apiUse InvalidCreds
 * 
 * @apiError NonUnique Unique constraint for this request was not met
 * @apiErrorExample NonUnique-Response
 *  HTTP/1.1 400 Bad Request
 *    {
 *      "status": "error",
 *      "error": "NonUnique",
 *      "message": "Provided `user_id` and `book_id` must be unique: [(1), (2)] already exists in the database.",
 *    }
 * 
 * @apiError NotFound Requested resource was not found.
 * @apiErrorExample NotFound-Response
 *  HTTP/1.1 404 Not Found
 *    {
 *      "status": "error",
 *      "error": "NotFound",
 *      "message": "No resource was found with the requested id (4)",
 *    }
 * 
 */
router.post('/:id', validateId(bookDB), validateBody(reviewBody), async (req, res) => {
  const { resource: { id: book_id }, token } = req;
  const { subject: user_id } = jwt.decode(token);
  try {
    const { id } = await db.add({
      ...req.body,
      book_id,
      user_id,
    });
    res.json({
      status: 'success',
      message: `Successfully add a review to book with id (${book_id})`,
      review: {
        id,
        rating: req.body.rating,
        content: req.body.review,
      },
    });
  } catch (error) {
    if (error.message.match(/unique constraint/i)) {
      return res.status(400).json({
        status: 'error',
        error: 'NonUnique',
        message: `Provided \`user_id\` and \`book_id\` must be unique: [(${user_id}), (${book_id})] already exists in the database.`,
      });
    }
    res.status(500).json(await log.err(error));
  }
});

/**
 * @api {delete} /reviews/:review_id Delete a review
 * @apiName Delete Review
 * @apiGroup Reviews
 * @apiDescription NOTE: This request ID is the id of the review you want to delete.
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Informative message indicating action(s) taken.
 * @apiSuccess {array} review A review with the requested id.
 * @apiSuccess {integer} review.id The review id.
 * @apiSuccess {float} reviews.rating Star rating (1-5) of the review.
 * @apiSuccess {string} review.content Body content of the review.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "message": "You successfully deleted a comment with id (14)",
 *       "review": {
 *         "id": 14,
 *         "review": "I've read better",
 *         "rating": 1.5
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
 *      "message": "No resource was found with the requested id (4)",
 *    }
 * 
 */
router.delete('/:id', validateId(db), async (req, res) => {
  const { user_id, id, review, rating } = req.resource;
  const { subject: reqUserId, role } = jwt.decode(req.token);

  if (reqUserId !== user_id && role !== 'admin') return res.status(403).json({
    status: 'error',
    error: 'InvalidAuth',
    message: 'You do not have access to this resource.',
  });

  await db.remove(id);

  res.json({
    status: 'success',
    message: `You successfully deleted a review with id (${id})`,
    review: {
      id,
      review,
      rating
    },
  });
});

/**
 * @api {put} /reviews/:review_id Edit a review
 * @apiName Edit Review
 * @apiGroup Reviews
 * @apiDescription NOTE: This request ID is the id of the review you want to edit.
 *
 * @apiHeader {string} Authorization Users token provided on registration/login
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Informative message indicating action(s) taken.
 * @apiSuccess {array} review A review with the requested id.
 * @apiSuccess {integer} review.id The review id.
 * @apiSuccess {float} reviews.rating Updated star rating (1-5) of the review.
 * @apiSuccess {string} review.content Updated body content of the review.
 * 
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *    {
 *       "status": "success",
 *       "message": "You successfully deleted a comment with id (14)",
 *       "review": {
 *         "id": 14,
 *         "review": "I've read better, but it is okay as far so books.",
 *         "rating": 2.5
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
 *      "message": "No resource was found with the requested id (4)",
 *    }
 * 
 */
router.put('/:id', validateId(db), async (req, res) => {
  try {
    const { id, review, rating } = await db.update(req.resource.id, req.body);
    res.json({
      id,
      review,
      rating
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

module.exports = router;

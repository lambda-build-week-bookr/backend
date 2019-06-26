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
  },
  review: {
    required: false,
    type: 'string',
  },
};

// ID is the book id
router.post('/:id', validateId(bookDB), validateBody(reviewBody), async (req, res) => {
  const { resource: { id: book_id }, token } = req;
  const { subject: user_id } = jwt.decode(token);
  try {
    // decode jwt for user id
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
    res.status(500).json(await log.err(error));
  }
});

// ID is the review id
router.delete('/:id', validateId(db), async (req, res) => {
  const { subject: reqUserId, role } = jwt.decode(req.token);
  const { user_id, id, review, rating } = req.resource;

  if (reqUserId !== user_id && role !== 'admin') return res.status(403).json({
    status: 'error',
    error: 'InvalidAuth',
    message: 'You do not have access to this resource.',
  });

  await db.remove(id);

  res.json({
    status: 'success',
    message: `You successfully deleted a comment with id (${id})`,
    review: {
      id,
      review,
      rating
    },
  });
})

module.exports = router;

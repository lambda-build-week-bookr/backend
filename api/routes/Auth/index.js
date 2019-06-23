const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();
const db = require('./auth.model');
const generateToken = require('../../../utils/generateToken');
const validateBody = require('../../middleware/validateBody');
const log = require('../../../utils/logger');

router.get('/', async (req, res) => {
  res.json({
    message: 'Auth API is up',
  });
});

const authBody = {
  email: {
    required: true,
    type: 'string',
  },
  password: {
    required: true,
    type: 'string',
  },
};

router.post('/register', validateBody(authBody), async (req, res) => {
  try {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);

    const saved = await db.add({
      ...user,
      password: hash,
    });

    const token = generateToken(user);

    res.status(201).json({
      status: 'success',
      message: `Successfully registered user with email ${user.email}`,
      user: {
        email: saved.email,
        token,
      }
    });
  } catch (error) {
    if (error.message.match(/unique constraint failed/i)) {
      return res.status(405).json({
        status: 'error',
        message: `Provided email must be unique, the email: \`${req.body.email}\` already exists in the database`
      });
    }
    res.status(500).json(await log.err(error));
  }
});

router.post('/login', validateBody(authBody), async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await db.getBy({ email }).first();

    if (!(user && bcrypt.compareSync(password, user.password))) return res.status(401).json({
      message: 'Invalid Credentials',
    });

    const token = generateToken(user);

    res.json({
      status: 'success',
      message: `Successfully logged in with email ${user.email}`,
      user: {
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
});

module.exports = router;

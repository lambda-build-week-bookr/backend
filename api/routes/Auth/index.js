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

/**
 * @api {post} /auth/register Register new user
 * @apiName AuthUser
 * @apiGroup Auth
 *
 * @apiParam {string} email Users unique email.
 * @apiParam {string} password Users password.
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Informative message indicating action(s) taken.
 * @apiSuccess {object} user User information.
 * @apiSuccess {string} user.email Users email.
 * @apiSuccess {string} user.token Users authentication token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *       "status": "success",
 *       "message": "Successfully registered a user with email test@gmail.com",
 *       "user": {
 *          "email": "test@gmail.com",
 *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NjEzMjI0NzksImV4cCI6MTU2MTQwODg3OX0.PC45fmQnUYAFXO_UaHY9Eefr8RnylExAul-pIFtUgBw",
 *       },
 *     }
 *
 * @apiUse InvalidType
 * @apiUse MissingField
 * 
 * @apiError NonUnique Unique constraint was not met.
 * @apiErrorExample NonUnique-Response
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "status": "error",
 *       "error": "NonUnique",
 *       "message": "Provided `email` must be unique: test@gmail.com already exists in the database",
 *     }
 * 
 */
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
    if (error.message.match(/unique constraint/i)) {
      return res.status(400).json({
        status: 'error',
        error: 'NonUnique',
        message: `Provided \`email\` must be unique: \`${req.body.email}\` already exists in the database`
      });
    }
    res.status(500).json(await log.err(error));
  }
});

/**
 * @api {post} /auth/login Login existing user
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiParam {string} email Users email.
 * @apiParam {string} password Users password.
 *
 * @apiSuccess {string} status Status of the request.
 * @apiSuccess {string} message Informative message indicating action(s) taken.
 * @apiSuccess {object} user  User information.
 * @apiSuccess {string} user.email Users email.
 * @apiSuccess {string} user.token Users authentication token.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "success",
 *       "message": "Successfully logged in with `email` test@gmail.com",
 *       "user": {
 *         "email": "test@gmail.com",
 *         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJpYXQiOjE1NjEzMjI0NzksImV4cCI6MTU2MTQwODg3OX0.PC45fmQnUYAFXO_UaHY9Eefr8RnylExAul-pIFtUgBw",
 *       }
 *     }
 * 
 * @apiUse InvalidType
 * @apiUse MissingField
 *
 * @apiError InvalidCredentials Provided credentials could not be validated.
 *
 * @apiErrorExample InvalidCredentials-Response:
 *     HTTP/1.1 401 Not Authorized
 *     {
 *       "status": "error",
 *       "error": "InvalidCredentials",
 *       "message": "Invalid Credentials",
 *     }
 */
router.post('/login', validateBody(authBody), async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await db.getBy({ email }).first();

    if (!(user && bcrypt.compareSync(password, user.password))) return res.status(401).json({
      status: 'error',
      error: 'InvalidCredentials',
      message: 'Invalid Credentials',
    });

    const token = generateToken(user);

    res.json({
      status: 'success',
      message: `Successfully logged in with \`email\` ${user.email}`,
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

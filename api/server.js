const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const books = require('./routes/Book');
const auth = require('./routes/Auth');
const authenticate = require('./middleware/auth');
const parser = require('../utils/parser');

const middleware = [
  express.json(),
  cors(),
  helmet(),
  logger,
];

const server = express();
server.use(middleware);

/**
 * @apiDefine MissingField
 * @apiError MissingField An expected field was not sent with the request.
 *
 * @apiErrorExample MissingField-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "status": "error",
 *       "error": "MissingField",
 *       "message": "Missing required field (email)",
 *     }
 */

/**
 * @apiDefine InvalidType
 * @apiError InvalidType An invalid field type was sent with the request.
 *
 * @apiErrorExample InvalidType-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "status": "error",
 *       "error": "InvalidType",
 *       "message": "Expected type for (password) to be string, but instead saw number",
 *     }
 */

 /**
  * @apiDefine MissingAuth
  * @apiError MissingAuth No Authorization header was sent with the request.
  * 
  * @apiErrorExample MissingAuth-Response:
  *   HTTP/1.1 400 Bad Request
  *   {
  *     "status": "error",
  *     "error": "MissingAuth",
  *     "message": "Please provide a token in the `Authorization` header.",
  *   }
  */

/**
 * @apiDefine InvalidCreds
 * @apiError InvalidCreds Token sent with the request is invalid or expired.
 * 
 * @apiErrorExample InvalidCreds-Response:
 *  HTTP/1.1 401 Unauthorized
 *  {
 *    "status": "error",
 *    "error": "InvalidCreds",
 *    "message": "Invalid/Expired authorization token provided.",
 *  }
 */

server.get('/', (req, res) => {
  res.json({
    message: 'Api is up and running',
  });
});

server.get('/testauth', authenticate, (req, res) => {
  res.json({
    message: 'Authenticated Route',
  });
});

server.get('/testbooks', async (req, res) => {
  const axios = require('axios');
  try {
    const books = await parser('physics');
    // const books = await axios.get('https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=AIzaSyAcMyBkoOkv-tbE6xyxalkmtpPT-r3K4Vk');
    res.json(books);
  } catch (error) {
    res.json(error);
  }
})

server.use('/api/books', books);
server.use('/api/auth', auth);
server.use('/api/docs', express.static(__dirname + '/docs'));

module.exports = server;

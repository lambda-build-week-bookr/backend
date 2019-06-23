const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const books = require('./routes/Book');
const auth = require('./routes/Auth');
const authenticate = require('./middleware/auth');

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

server.use('/api/books', books);
server.use('/api/auth', auth);
server.use('/api/docs', express.static(__dirname + '/docs'));

module.exports = server;

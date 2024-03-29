const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const logger = require('./middleware/logger');
const books = require('./routes/Book');
const auth = require('./routes/Auth');
const reviews = require('./routes/Review');

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

 /**
 * @apiDefine admin Admin role required
 * Only users with the role admin can access this endpoint
 * 
 */

server.get('/', (req, res) => {
  res.json({
    message: 'Api is up and running',
  });
});

server.use('/api/books', books);
server.use('/api/auth', auth);
server.use('/api/reviews', reviews);
server.use('/api/docs', express.static(__dirname + '/docs'));

module.exports = server;

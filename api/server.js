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
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
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

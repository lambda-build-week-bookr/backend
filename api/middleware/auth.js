const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';
const log = require('../../utils/logger');

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(400).json({
      status: 'error',
      error: 'MissingAuth',
      message: 'Please provide a token in the `Authorization` header.',
    });

    jwt.verify(req.headers.authorization, secret, (error, decoded) => {
      if (error) return res.status(401).json({
        status: 'error',
        error: 'InvalidCreds',
        message: 'Invalid/Expired authorization token provided.',
      });

      // TODO: Add roles
      // req.roles= decoded.roles;

      next();
    })
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
}

module.exports = auth;
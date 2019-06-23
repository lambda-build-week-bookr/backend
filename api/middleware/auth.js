const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'set a secret in your .env file';
const log = require('../../utils/logger');

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) return res.status(400).json({
      status: 'error',
      message: 'Please provide a token in the Authorization header',
    });

    jwt.verify(req.headers.authorization, secret, (error, decoded) => {
      if (error) return res.status(401).json({
        status: 'error',
        message: "Invalid Credentials",
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
const jwt = require('jsonwebtoken');

const log = require('../../utils/logger');

const access = access => async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const { role } = jwt.decode(authorization);

    if (role !== access) return res.status(403).json({
      status: 'error',
      error: 'Invalid Access',
      message: 'You do not have access to this endpoint.',
    });

    next();
  } catch (error) {
    res.status(500).json(await log.err(error));
  }
};

module.exports = access;

const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable';

const generateToken = user => {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;

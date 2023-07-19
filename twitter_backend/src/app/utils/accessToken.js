const jwt = require('jsonwebtoken');
const secret_key = require('../../configs/jwt.configs');

const generateAccessToken = (userId) => {
  const payload = { userId };
  const token = jwt.sign(payload, secret_key);
  return token;
};

module.exports = generateAccessToken;

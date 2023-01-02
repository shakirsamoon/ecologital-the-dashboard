const jwt = require('jsonwebtoken');

const generateJwtToken = (data) => {
  return jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};

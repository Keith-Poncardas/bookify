const jwt = require('jsonwebtoken');

const generateToken = ({ user }) => {
  const { id, username } = user;
  return jwt.sign({ id: id, username: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

module.exports = { generateToken }; 
const jwt = require('jsonwebtoken');

/**
 * Generates a JSON Web Token (JWT) for a given user.
 *
 * @param {Object} param0 - The parameter object.
 * @param {Object} param0.user - The user object.
 * @param {string} param0.user.username - The username of the user.
 * @returns {string} The generated JWT.
 */
const generateToken = ({ user }) => {
  const { username } = user;
  return jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

module.exports = { generateToken }; 
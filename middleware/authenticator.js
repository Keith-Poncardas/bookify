const jwt = require('jsonwebtoken');

/**
 * Middleware to authenticate a user based on a JWT token stored in cookies.
 * If the token is not present or invalid, the user is redirected to the login page.
 * If the token is valid, the decoded user information is attached to the request object.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.redirect('/auth/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('/auth/login');
  };
};

module.exports = authenticate;
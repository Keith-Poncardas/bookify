const { credAuth } = require("../utils/credValidator");
const { getNavbarConfig } = require("../utils/navbarConfig");
const { generateToken } = require("../utils/tokenGenerator");

/**
 * Renders the login page with the appropriate navbar configuration.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const getLogin = (req, res) => {
  const isAuthFailed = String(req.query.authFailed) === 'true';

  res.render('auth/login', {
    ...getNavbarConfig('login'),
    isAuthFailed,
    errorMsg: isAuthFailed ? 'Invalid Credentials, Try Again.' : null
  });
};


/**
 * Handles user login by authenticating credentials, generating a token, and setting a cookie.
 * If authentication fails, renders the login page with the appropriate navbar configuration.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request containing user credentials.
 * @param {Object} res - The response object.
 * @returns {void}
 */
const login = (req, res) => {
  const user = credAuth({ creds: req.body });
  if (!user) return res.redirect('/auth/login?authFailed=true');

  const token = generateToken({ user });

  res.cookie('token', token, { httpOnly: true });
  res.redirect('/dashboard');
};

module.exports = { getLogin, login };
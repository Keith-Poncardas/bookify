const { credAuth } = require("../utils/credValidator");
const { getNavbarConfig } = require("../utils/navbarConfig");
const { generateToken } = require("../utils/tokenGenerator");

const getLogin = (req, res) => {
  res.render('auth/login', { ...getNavbarConfig('login') });
};

const login = (req, res) => {
  const user = credAuth({ creds: req.body });
  if (!user) return res.render('auth/login', { ...getNavbarConfig('login') });

  const token = generateToken({ user });

  res.cookie('token', token, { httpOnly: true });
  res.redirect('/dashboard');
};

module.exports = { getLogin, login };
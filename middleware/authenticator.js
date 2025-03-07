const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.redirect('auth/login');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie('token');
    return res.redirect('auth/login');
  };
};

module.exports = authenticate;
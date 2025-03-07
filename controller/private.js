
const retrieveHomeDashboard = (req, res) => {
  res.render('private/home');
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/auth/login');
};

module.exports = { retrieveHomeDashboard, logout };
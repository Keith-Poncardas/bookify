const getNavbarConfig = (page) => {
  const configs = {
    login: { homePath: 'book', btnPath: 'dashboard', title: 'Admin' },
    dashboard: { homePath: 'dashboard', btnPath: 'book', title: 'Home' },
    home: { homePath: 'book', btnPath: 'dashboard', title: 'Admin' },
    view: { homePath: 'book', btnPath: 'dashboard', title: 'Admin' },
  };
  return configs[page] || {}; // Default to empty object if no match
};

module.exports = { getNavbarConfig };
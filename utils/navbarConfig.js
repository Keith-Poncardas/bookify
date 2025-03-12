/**
 * Retrieves the navigation bar configuration for a given page.
 *
 * @param {string} page - The name of the page to get the navbar configuration for.
 * @returns {Object} The configuration object for the specified page, containing:
 * - {string} homePath - The path for the home button.
 * - {string} btnPath - The path for the button.
 * - {string} title - The title to be displayed.
 * If the page is not found, an empty object is returned.
 */
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
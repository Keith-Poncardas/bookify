
/**
 * Validates the provided credentials against environment variables.
 *
 * @param {Object} param0 - An object containing the credentials.
 * @param {Object} param0.creds - The credentials object.
 * @param {string} param0.creds.username - The username to validate.
 * @param {string} param0.creds.password - The password to validate.
 * @returns {Object|null} - Returns an object with the username if credentials are valid, otherwise null.
 */
const credAuth = ({ creds }) => {
  const { username, password } = creds;

  if (username.trim() === process.env.USN && password.trim() === process.env.PASS) {
    return { username };
  }

  return null;
};

module.exports = { credAuth };
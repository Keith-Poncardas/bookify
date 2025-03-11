const credAuth = ({ creds }) => {
  const { username, password } = creds;

  if (username.trim() === process.env.USN && password.trim() === process.env.PASS) {
    return { username };
  }

  return null;
};

module.exports = { credAuth };
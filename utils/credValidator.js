
const credAuth = ({ creds }) => {
  const { username, password } = creds;

  if (username === process.env.USERNAME && password === process.env.PASSWORD) {
    return { username };
  }

  return null;
};

module.exports = { credAuth };
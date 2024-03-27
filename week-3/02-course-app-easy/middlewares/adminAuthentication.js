function adminAuthentication(req, res, next) {
  const userName = req.headers.username;
  const userPassword = req.headers.password;

  const userInd = ADMINS.findIndex(
    (val) => userName === val.username && userPassword == val.password
  );
  if (userInd == -1) {
    res.status(404).send(`Admin Not Found`);
  } else {
    next();
  }
}

module.exports = adminAuthentication;

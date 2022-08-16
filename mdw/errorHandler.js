const errorHandler = (err, req, res, next) => {
  if (
    err === 'authorization' ||
    (err.name && err.name === 'JsonWebTokenError')
  ) {
    return res.status(401).json({ message: 'Authorization required!' });
  }
  if (
    err === 'invalid' ||
    err === 'SequelizeValidationError' ||
    (err && err.name === 'SyntaxError')
  ) {
    return res.status(400).json({ message: 'Invalid input!' });
  }
  console.log(err.name);
  return res.sendStatus(500);
};

module.exports = errorHandler;

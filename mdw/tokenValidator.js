const jwt = require('jsonwebtoken');
const { SECRET } = require('../utilities/config');

const tokenValidator = (req, _res, next) => {
  const authorization = req.headers.authorization;

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    const token = authorization.substring(7);
    const isValidToken = jwt.verify(token, SECRET);
    if (isValidToken) {
      req.user = isValidToken;
      return next();
    }
  }
  return next('authorization');
};

module.exports = tokenValidator;

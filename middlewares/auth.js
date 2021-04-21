const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
const {
  productionEnvKeyWord,
  jwtDevSecret,
  authSchema,
  authNeededErrorMessage,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const tokenSignatureKey = (NODE_ENV === productionEnvKeyWord ? JWT_SECRET : jwtDevSecret);

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith(authSchema)) {
    return next(new UnauthorizedError(authNeededErrorMessage));
  }
  const token = authorization.replace(authSchema, '');
  let payload;
  try {
    payload = jwt.verify(token, tokenSignatureKey);
  } catch (err) {
    return next(new UnauthorizedError(authNeededErrorMessage));
  }
  req.user = payload;
  return next();
};

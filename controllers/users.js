const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const {
  productionEnvKeyWord,
  jwtDevSecret,
  jwtEnableDuration,
  notFoundErrorMessage,
  mailBeenUsedErrorMessage,
  incorrectEmailOrPasswordErrorMessage,
  userCreatedMessage,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const tokenSignatureKey = (NODE_ENV === productionEnvKeyWord ? JWT_SECRET : jwtDevSecret);

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

const updateUserInfo = (req, res, next) => {
  // какая инф обновляется
  const { name, email } = req.body;
  // айди берется из токена через мидлвару
  const profileId = req.user._id;
  User.findByIdAndUpdate(profileId, { name, email }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError(notFoundErrorMessage); })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

const signup = (req, res, next) => {
  const { email, name, password } = req.body;
  // console.log(email, name, password);
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, name, password: hash })
        .then(() => res.send({ message: userCreatedMessage }))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictError(mailBeenUsedErrorMessage));
          }
          return next(err);
        });
    });
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(incorrectEmailOrPasswordErrorMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NotFoundError(incorrectEmailOrPasswordErrorMessage);
          }
          const token = jwt.sign(
            { _id: user._id }, tokenSignatureKey, { expiresIn: jwtEnableDuration },
          );
          return res.send({ token });
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  getUserInfo,
  updateUserInfo,
  signup,
  signin,
};

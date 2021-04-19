const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');
const BadRequestError = require('../errors/bad-request-error');
const {
  movieCreatedMessage,
  movieDeletedMessage,
  notFoundErrorMessage,
  permissionDeniedErrorMessage,
  incorrectIdErrorMessage,
  mongoIdIncorrectErrorCode,
} = require('../utils/constants');

const getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => next(err));
};

const createMovieNote = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    // owner,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner: req.user,
    movieId,
    nameRU,
    nameEN,
  })
    .then(() => res.send({ message: movieCreatedMessage }))
    .catch((err) => next(err));
};

const deleteMovieNote = (req, res, next) => {
  Movie.findById(req.params.id)
    .orFail(() => { throw new NotFoundError(notFoundErrorMessage); })
    .then((movie) => {
      if (JSON.stringify(req.user._id) === JSON.stringify(movie.owner)) {
        Movie.findByIdAndRemove(req.params.id)
          .then(() => res.send({ message: movieDeletedMessage }));
      } else {
        throw new ForbiddenError(permissionDeniedErrorMessage);
      }
    })
    .catch((err) => {
      if (err.kind === mongoIdIncorrectErrorCode) {
        next(new BadRequestError(incorrectIdErrorMessage));
      }
      next(err);
    });
};

module.exports = {
  getUserMovies,
  createMovieNote,
  deleteMovieNote,
};

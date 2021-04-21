const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');
const { wrongURLFormatMessage } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: wrongURLFormatMessage,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: wrongURLFormatMessage,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: wrongURLFormatMessage,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    //  включить валидацию кириллицы?
  },
  nameEN: {
    type: String,
    required: true,
    //  включить валидацию латиницы?
  },
});

module.exports = mongoose.model('movie', movieSchema);

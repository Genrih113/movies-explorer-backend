const router = require('express').Router();
const {
  validateCreateMovieNoteReqBody,
  validateDeleteMovieNoteReqParams,
} = require('../middlewares/celebrate-req-validators');
const {
  getUserMovies,
  createMovieNote,
  deleteMovieNote,
} = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', validateCreateMovieNoteReqBody, createMovieNote);
router.delete('/:id', validateDeleteMovieNoteReqParams, deleteMovieNote);

module.exports = router;

const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationCreateMovie,
} = require('../utils/validations');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:id', deleteMovie);

module.exports = router;

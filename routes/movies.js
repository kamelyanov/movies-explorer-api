const router = require('express').Router();

const {
  getMovies,
  createMovie,

} = require('../controllers/users');

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().min(2).max(30).required(),
      director: Joi.string().min(2).max(30).required(),
      duration: Joi.string().min(2).max(30).required(),
      year: Joi.number().integer().pattern(new RegExp('/^\d{4}$/')),
      description: Joi.string().min(2).max(30).required(),
      image: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
      trailer: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
      nameRU: Joi.string().min(2).max(30).pattern(new RegExp('/[А-Яа-яЁё\d\-]/gi/')).required(),
      nameEN: Joi.string().min(2).max(30).pattern(new RegExp('/[A-Za-z\d\-]/gi/')).required(),
      thumbnail: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
      movieId: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    }).unknown(true),
  }),
  createMovie,
);
router.delete('/', deleteMovie);

module.exports = router;
const { celebrate, Joi } = require('celebrate');

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().min(2).max(30).required(),
    director: Joi.string().min(2).max(30).required(),
    duration: Joi.string().min(2).max(30).required(),
    year: Joi.number().integer(),
    description: Joi.string().min(2).max(30).required(),
    image: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    trailerLink: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    thumbnail: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
    movieId: Joi.number().integer(),
    nameRU: Joi.string().pattern(/([а-яА-ЯёЁ0-9_.-]){3,30}/).required(),
    nameEN: Joi.string().pattern(/([A-Za-z0-9_.-]){3,30}/).required(),
  }).unknown(true),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  validationLogin,
  validationCreateUser,
  validationCreateMovie,
  validationUpdateUser,
};

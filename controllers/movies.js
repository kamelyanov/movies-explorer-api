const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const {
  STATUS_OK,
  STATUS_CREATED,
  INCORRECT_DATA,
  CARD_NOT_FOUND,
  PROHIBITION_DEL_CARD,
} = require('../constants/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
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
    trailerLink,
    thumbnail,
    movieId,
    owner: req.user._id,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(STATUS_CREATED).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(INCORRECT_DATA));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(new NotFoundError(CARD_NOT_FOUND))
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        next(new ForbiddenErr(PROHIBITION_DEL_CARD));
        return;
      }
      Movie.findByIdAndRemove(req.params.cardId)
        .then(() => {
          res.status(STATUS_OK).send({ message: 'Карточка удалена' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(INCORRECT_DATA));
        return;
      }
      next(err);
    });
};

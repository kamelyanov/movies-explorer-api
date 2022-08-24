// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies

// # создаёт фильм с переданными в теле
// # country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
// POST /movies

// # удаляет сохранённый фильм по id
// DELETE /movies/_id

const Movie = require('../models/movie');

module.exports.getMovies = (req, res, next) => {
   Movie.find({})
     .then((movies) => res.send(movies))
     .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId })
    .then(movie => res.send({movie}))
    .catch(next);
}

module.exports.deleteMovie = (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(movie => res.send({movie}))
    .catch(next);
}

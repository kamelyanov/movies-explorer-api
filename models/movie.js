const mongoose = require('mongoose');

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
      validator(link) {
        return /https?:\/\/(www.)?[\w._~:/?#[\]@!$&'()*+,;=]*#?/.test(link);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /https?:\/\/(www.)?[\w._~:/?#[\]@!$&'()*+,;=]*#?/.test(link);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return /https?:\/\/(www.)?[\w._~:/?#[\]@!$&'()*+,;=]*#?/.test(link);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return /([а-яА-ЯёЁ0-9_.-]){3,30}/.test(text);
      },
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return /([A-Za-z0-9_.-]){3,30}/.test(text);
      },
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);

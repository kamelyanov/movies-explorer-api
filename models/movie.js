const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return /[А-Яа-яЁё\d\-]/gi/.test(text);
      },
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator(text) {
        return /[A-Za-z\d\-]/gi/.test(text);
      },
    },
  },
});

module.exports = mongoose.model('user', userSchema);

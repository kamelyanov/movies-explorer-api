require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const ConflictErr = require('../errors/ConflictErr');
const NotFoundError = require('../errors/not-found-err');
const BadRequestErr = require('../errors/BadRequestErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const {
  STATUS_OK,
  STATUS_CREATED,
  USER_NOT_FOUND,
  INCORRECT_DATA,
  EXIST_EMAIL,
} = require('../constants/constants');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(USER_NOT_FOUND))
    .then((user) => {
      res.status(STATUS_OK).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(INCORRECT_DATA));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictErr(EXIST_EMAIL));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(STATUS_CREATED).send({
      name: user.name,
      _id: user._id,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(INCORRECT_DATA));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictErr(EXIST_EMAIL));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

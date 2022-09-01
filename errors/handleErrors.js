const { STATUS_DEFAULT_ERROR, DEFAULT_ERROR } = require('../constants/constants');

const handleErrors = (err, req, res, next) => {
  const { statusCode = STATUS_DEFAULT_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === STATUS_DEFAULT_ERROR
        ? DEFAULT_ERROR
        : message,
    });
  next();
};

module.exports = handleErrors;

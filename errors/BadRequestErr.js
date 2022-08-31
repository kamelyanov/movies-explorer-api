const { STATUS_BAD_REQUEST } = require('../constants/constants');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_BAD_REQUEST;
  }
}

module.exports = BadRequestErr;

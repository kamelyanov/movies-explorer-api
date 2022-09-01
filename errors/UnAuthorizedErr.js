const { STATUS_NOT_AUTH } = require('../constants/constants');

class UnAuthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_NOT_AUTH;
  }
}

module.exports = UnAuthorizedErr;

const { STATUS_CONFLICT } = require('../constants/constants');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CONFLICT;
  }
}

module.exports = ConflictErr;

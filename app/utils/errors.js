class ValidationError extends Error {
  constructor(message = 'Validation Error') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message = 'Resource Not Found') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class UnexpectedError extends Error {
  constructor(message = 'Unexpected Error') {
    super(message);
    this.name = 'UnexpectedError';
    this.statusCode = 500;
  }
}

module.exports = {
  ValidationError,
  NotFoundError,
  UnexpectedError
};

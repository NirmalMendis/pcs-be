class AppError extends Error {
  constructor({ message, statusCode, originalError }) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    if (originalError) {
      this.originalStack = originalError.stack;
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;

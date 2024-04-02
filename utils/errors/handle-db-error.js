const { StatusCodes } = require('http-status-codes');
const AppError = require('./AppError');

exports.handleDuplicateEntryError = (err) => {
  const message = `Record with value ${err.value} for ${err.path} already exists`;
  return new AppError({ message, statusCode: StatusCodes.BAD_REQUEST });
};

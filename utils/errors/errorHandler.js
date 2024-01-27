const { StatusCodes } = require('http-status-codes');
const {
  DEVELOPMENT_ENV,
  PRODUCTION_ENV,
  GENERIC_PROD_ERROR,
  ERROR,
} = require('../constants/generic-constantss');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ERROR,
      message: GENERIC_PROD_ERROR,
    });
  }
};

module.exports = (err, _, res) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || ERROR;
  if (process.env.NODE_ENV === DEVELOPMENT_ENV) {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === PRODUCTION_ENV) {
    sendErrorProd(err, res);
  }
};

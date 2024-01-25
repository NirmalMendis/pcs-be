const { StatusCodes } = require("http-status-codes");
const {
  DEVELOPMENT_ENV,
  PRODUCTION_ENV,
  GENERIC_PROD_ERROR,
  ERROR,
} = require("../constants/generic-constantss");

const sendErrorDev = (err, res) => {
  console.log(err);
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

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  err.status = err.status || ERROR;

  console.log(err.name);
  if (process.env.NODE_ENV === DEVELOPMENT_ENV) {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === PRODUCTION_ENV) {
    sendErrorProd(err, res);
  }
};

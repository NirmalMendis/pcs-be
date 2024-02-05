const { StatusCodes } = require('http-status-codes');
const { Response } = require('express');

/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {string} [jwt] - only used when logging in
 */
const sendSuccessResponse = (res, data) => {
  res.status(StatusCodes.OK).json({
    data,
  });
};

module.exports = sendSuccessResponse;

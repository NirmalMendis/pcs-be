const { StatusCodes } = require('http-status-codes');
const { SUCCESS } = require('../../utils/constants/generic-constantss');
const { Response } = require('express');
const { PagerType } = require('./pagination');

/**
 *
 * @param {Response} res
 * @param {Object} data
 * @param {string} [jwt] - only used when logging in
 * @param {PagerType} [extraData]
 */
const sendSuccessResponse = (res, data, extraData, jwt) => {
  res.status(StatusCodes.OK).json({
    status: SUCCESS,
    jwt,
    data: {
      data,
      extraData,
    },
  });
};

module.exports = sendSuccessResponse;

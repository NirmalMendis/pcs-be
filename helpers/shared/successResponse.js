const { StatusCodes } = require("http-status-codes");
const { SUCCESS } = require("../../utils/constants/generic-constantss");

const sendSuccessResponse = (res, data, jwt, extraData) => {
  if (jwt) {
    res.status(StatusCodes.OK).json({
      status: SUCCESS,
      jwt: jwt,
      data: {
        data: data,
      },
    });
  } else {
    res.status(StatusCodes.OK).json({
      status: SUCCESS,
      data: {
        data: data,
        extraData: extraData,
      },
    });
  }
};

module.exports = sendSuccessResponse;

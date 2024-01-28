const sendSuccessResponse = require('../helpers/shared/success-response');
const UserService = require('../services/user-service/user-service');
const catchAsync = require('../utils/catchAsync');

/**
 * @namespace
 */
const UserController = {
  createUser: catchAsync(async (req, res) => {
    const newUser = await UserService.createUser(req.body);
    sendSuccessResponse(res, newUser);
  }),
};

module.exports = UserController;

const sendSuccessResponse = require('../helpers/shared/success-response');
const User = require('../models/user');
const DbFactoryService = require('../services/db-factory-service/db-factory-service');
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
  getUser: DbFactoryService.getOne(User, undefined, true),
};

module.exports = UserController;

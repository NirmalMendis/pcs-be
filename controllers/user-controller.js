const sendSuccessResponse = require('../helpers/shared/success-response');
const Branch = require('../models/branch');
const User = require('../models/user');
const DbFactoryService = require('../services/db-factory-service');
const UserService = require('../services/user-service');
const catchAsync = require('../utils/catchAsync');

/**
 * @namespace
 */
const UserController = {
  createUser: catchAsync(async (req, res) => {
    const newUser = await UserService.createUser(req.body);
    sendSuccessResponse(res, newUser);
  }),
  getUser: DbFactoryService.getOne(
    User,
    {
      include: [
        { model: Branch, as: 'branches' },
        { model: Branch, as: 'activeBranch' },
      ],
    },
    true,
  ),
  updateActiveBranch: catchAsync(async (req, res) => {
    await UserService.updateActiveBranch(req.body.activeBranchId, req.user.id);
    sendSuccessResponse(res);
  }),
};

module.exports = UserController;

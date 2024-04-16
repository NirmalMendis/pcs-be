const sendSuccessResponse = require('../helpers/shared/success-response');
const Branch = require('../models/branch');
const Function = require('../models/function');
const Role = require('../models/role');
const User = require('../models/user');
const DbFactoryService = require('../services/db-factory-service');
const UserService = require('../services/user-service');
const catchAsync = require('../utils/catchAsync');

/**
 * @namespace
 */
const UserController = {
  // eslint-disable-next-line no-unused-vars
  createUser: catchAsync(async (req, res, next) => {
    const newUser = await UserService.createUser(req.body);
    sendSuccessResponse(res, newUser);
  }),
  getUser: DbFactoryService.getOne(
    User,
    {
      include: [
        { model: Branch, as: 'branches' },
        { model: Branch, as: 'activeBranch' },
        { model: Role },
      ],
    },
    true,
  ),
  getAllUser: DbFactoryService.getAll(
    User,
    {
      include: [
        { model: Branch, as: 'branches' },
        { model: Branch, as: 'activeBranch' },
        { model: Role, include: [{ model: Function }] },
      ],
    },
    true,
  ),
  // eslint-disable-next-line no-unused-vars
  updateActiveBranch: catchAsync(async (req, res, next) => {
    await UserService.updateActiveBranch(req.body.activeBranchId, req.user.id);
    sendSuccessResponse(res);
  }),
  // eslint-disable-next-line no-unused-vars
  getUserPermissions: catchAsync(async (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    const userPermissions = await UserService.getUserPermissions(
      req.user,
      accessToken,
    );
    sendSuccessResponse(res, userPermissions);
  }),
};

module.exports = UserController;

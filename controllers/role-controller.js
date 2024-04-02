const sendSuccessResponse = require('../helpers/shared/success-response');
const Function = require('../models/function');
const Role = require('../models/role');
const DbFactoryService = require('../services/db-factory-service');
const RoleService = require('../services/role-service');
const catchAsync = require('../utils/catchAsync');

/**
 * @namespace
 */
const RoleController = {
  getRole: DbFactoryService.getOne(Role, {
    include: [Function],
  }),
  getRoles: DbFactoryService.getAll(Role, {
    include: [Function],
  }),
  // eslint-disable-next-line no-unused-vars
  createRole: catchAsync(async (req, res, next) => {
    const role = await RoleService.createRole(req.body, req.user);
    sendSuccessResponse(res, role);
  }),
  // eslint-disable-next-line no-unused-vars
  updateRole: catchAsync(async (req, res, next) => {
    const role = await RoleService.updateRole(
      req.params.id,
      req.body,
      req.user,
    );
    sendSuccessResponse(res, role);
  }),
  deleteRole: DbFactoryService.deleteOne(Role),
};

module.exports = RoleController;

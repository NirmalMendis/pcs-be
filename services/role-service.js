const { RoleType } = require('../models/role');
const { UserType } = require('../models/user');
const { FunctionType } = require('../models/function');
const { RoleConnectFunctionType } = require('../models/role-connect-function');
const sequelize = require('../utils/database');
const Role = require('../models/role');
const Function = require('../models/function');

/**
 * @namespace
 */
const RoleService = {
  /**
   *
   * @param  {Pick<RoleType,  'roleName' | 'status'> & {functions: Array<Pick<FunctionType, 'id'> & Pick<RoleConnectFunctionType, 'action'>>}} roleData
   * @param {UserType} user
   * @returns {Promise<(RoleType | void)>}
   */
  createRole: async (roleData, user) => {
    const transaction = await sequelize.transaction();
    try {
      /**
       * @type {RoleType}
       */
      const role = await Role.create(
        {
          roleName: roleData.roleName,
          status: roleData.status,
        },
        { transaction },
      );

      // Find the functions by their IDs
      const functions = await Function.findAll(
        {
          where: {
            id: roleData.functions.map((item) => item.id),
          },
        },
        { transaction },
      );

      // Set the functions for the role
      await role.setFunctions(functions, {
        through: { action: roleData.functions.map((item) => item.action) },
        transaction,
      });
      await role.setLastUpdatedBy(user, { transaction });

      await transaction.commit();

      return role;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = RoleService;

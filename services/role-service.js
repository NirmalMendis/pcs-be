const { RoleType } = require('../models/role');
const { UserType } = require('../models/user');
const { FunctionType } = require('../models/function');
const { RoleConnectFunctionType } = require('../models/role-connect-function');
const { sequelize } = require('../utils/database');
const Role = require('../models/role');
const Function = require('../models/function');

/**
 * @namespace
 */
const RoleService = {
  /**
   *
   * @param  {Pick<RoleType,  'title' | 'status'> & {functions: Array<Pick<FunctionType, 'id'> & Pick<RoleConnectFunctionType, 'action'>>}} roleData
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
          title: roleData.title,
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

      const setFunctionsPromise = Promise.all(
        roleData.functions.map((func) => {
          return role.addFunction(
            functions.find((dbFunc) => dbFunc.id === func.id),
            {
              through: {
                action: func.action,
              },
              transaction,
            },
          );
        }),
      );

      await setFunctionsPromise;
      await role.setLastUpdatedBy(user, { transaction });

      await transaction.commit();

      return role;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  /**
   *
   * @param {number} roleId
   * @param  {Pick<RoleType,  'title' | 'status'> & {functions: Array<Pick<FunctionType, 'id'> & Pick<RoleConnectFunctionType, 'action'>>}} roleData
   * @param {UserType} user
   * @returns {Promise<(RoleType | void)>}
   */
  updateRole: async (roleId, roleData, user) => {
    const transaction = await sequelize.transaction();
    try {
      const role = await Role.findByPk(roleId, {
        include: [Function],
        transaction,
      });

      await role.update(
        {
          title: roleData.title,
          status: roleData.status,
        },
        { transaction },
      );

      const functions = await Function.findAll(
        {
          where: {
            id: roleData.functions.map((item) => item.id),
          },
        },
        { transaction },
      );

      await role.removeFunctions(
        role.functions.map((func) => func.id),
        { transaction },
      );

      const setFunctionsPromise = Promise.all(
        functions.map((func) => {
          return role.addFunction(func, {
            through: {
              action: roleData.functions.find(
                (payloadFunc) => payloadFunc.id === func.id,
              ).action,
            },
            transaction,
          });
        }),
      );
      await setFunctionsPromise;

      await role.setLastUpdatedBy(user, { transaction });

      await transaction.commit();
      await role.reload();
      return role;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};

module.exports = RoleService;

const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @enum {string}
 * @readonly
 */
const PermissionActionEnum = {
  VIEW: 'view',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

/**
 * @typedef {Object} RoleConnectFunctionType
 * @property {PermissionActionEnum} action
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} functionId
 * @property {number} roleId
 */

const RoleConnectFunction = sequelize.define(
  'role_connect_function',
  {
    action: {
      type: DataTypes.ENUM(
        PermissionActionEnum.CREATE,
        PermissionActionEnum.VIEW,
        PermissionActionEnum.UPDATE,
        PermissionActionEnum.DELETE,
      ),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = RoleConnectFunction;
exports.PermissionActionEnum = PermissionActionEnum;

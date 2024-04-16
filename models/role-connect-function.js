const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');

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
 * @property {number} id
 * @property {PermissionActionEnum} action
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} functionId
 * @property {number} roleId
 */

const RoleConnectFunction = sequelize.define('role_connect_function', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = RoleConnectFunction;
exports.PermissionActionEnum = PermissionActionEnum;

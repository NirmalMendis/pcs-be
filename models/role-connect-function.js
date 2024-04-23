const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');
const { PermissionActionEnum } = require('../utils/constants/db-enums');

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

const RoleConnectFunction = sequelize.define(
  'role_connect_function',
  {
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
  },
  {
    paranoid: true,
  },
);

module.exports = RoleConnectFunction;

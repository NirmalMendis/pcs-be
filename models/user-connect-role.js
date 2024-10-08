const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

/**
 * @typedef {Object} UserConnectRoleType
 * @property {number} roleId
 * @property {number} userId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const UserConnectRole = sequelize.define(
  'user_connect_role',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = UserConnectRole;

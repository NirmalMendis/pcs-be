const sequelize = require('../utils/database');

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
  {},
  {
    paranoid: true,
  },
);

module.exports = UserConnectRole;

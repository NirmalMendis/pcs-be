const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

/**
 * @typedef {Object} UserConnectBranchType
 * @property {number} branchId
 * @property {number} userId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const UserConnectBranch = sequelize.define(
  'user_connect_branch',
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

module.exports = UserConnectBranch;

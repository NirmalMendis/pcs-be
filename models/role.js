const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @enum {string}
 * @readonly
 */
const RoleStatusEnum = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
};

/**
 * @typedef {Object} RoleType
 * @property {number} id
 * @property {string} title
 * @property {RoleStatusEnum} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const Role = sequelize.define(
  'role',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM(RoleStatusEnum.ACTIVE, RoleStatusEnum.INACTIVE),
      allowNull: false,
    },
  },
  {
    scopes: {
      essential: {
        attributes: ['id', 'title'],
      },
    },
  },
);

module.exports = Role;
exports.RoleStatusEnum = RoleStatusEnum;

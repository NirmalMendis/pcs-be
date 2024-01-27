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
 * @typedef {Object} PawnTicketType
 * @property {number} id
 * @property {string} roleName
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
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Inactive'),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    scopes: {
      essential: {
        attributes: ['id', 'roleName'],
      },
    },
  },
);

module.exports = Role;
exports.RoleStatusEnum = RoleStatusEnum;

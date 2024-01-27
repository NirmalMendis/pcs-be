const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @typedef {Object} BranchType
 * @property {number} id
 * @property {string} name
 * @property {string} mobileNo
 * @property {string} email
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} addressLine3
 * @property {string} city
 * @property {string} postalCode
 * @property {string} logoURL
 * @property {string} isMainBranch
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const Branch = sequelize.define(
  'branch',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    addressLine3: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    logoURL: DataTypes.STRING,
    isMainBranch: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Branch;

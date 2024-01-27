const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @typedef {Object} CustomerType
 * @property {number} id
 * @property {string} nicNo
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} mobileNo
 * @property {string} addressLine1
 * @property {string} addressLine2
 * @property {string} addressLine3
 * @property {string} city
 * @property {string} postalCode
 * @property {number} branchId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const Customer = sequelize.define(
  'customer',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nicNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    addressLine3: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING,
  },
  {
    paranoid: true,
  },
);

module.exports = Customer;

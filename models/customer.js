const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const capitalize = require('../helpers/shared/capitalize');

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
 * @property {string} searchString
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
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return capitalize(`${this.firstName} ${this.lastName}`);
      },
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
    searchString: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
    indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['searchString'] }],
    defaultScope: {
      attributes: {
        exclude: ['searchString'],
      },
    },
    hooks: {
      afterCreate: async (customer, options) => {
        customer.searchString = `${customer.id} ${customer.firstName} ${customer.lastName} ${customer.email} ${customer.mobileNo} ${customer.addressLine1}`;
        await customer.save({
          fields: ['searchString'],
          transaction: options.transaction,
        });
      },
      beforeUpdate: async (customer) => {
        customer.searchString = `${customer.id} ${customer.firstName} ${customer.lastName} ${customer.email} ${customer.mobileNo} ${customer.addressLine1}`;
      },
    },
  },
);

module.exports = Customer;

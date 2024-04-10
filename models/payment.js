const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');
const { PaymentTypesEnum } = require('../utils/constants/db-enums');

/**
 * @typedef {Object} PaymentType
 * @property {number} id
 * @property {number} amount
 * @property {Date} paymentDate
 * @property {PaymentTypesEnum} type
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} branchId
 * @property {number} pawnTicketId
 */

const Payment = sequelize.define(
  'payment',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Payment;

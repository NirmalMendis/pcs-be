const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @typedef {Object} PaymentType
 * @property {number} id
 * @property {number} amount
 * @property {Date} paymentDate
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
  },
  {
    paranoid: true,
  },
);

module.exports = Payment;

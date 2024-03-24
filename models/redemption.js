const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @typedef {Object} RedemptionType
 * @property {number} id
 * @property {Date} redemptionDate
 * @property {number} amountPaid
 * @property {number} remainingAmount
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} pawnTicketId
 */

const Redemption = sequelize.define(
  'redemption',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    redemptionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    amountPaid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    remainingAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Redemption;

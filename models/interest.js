const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const { InterestStatusEnum } = require('../utils/constants/db-enums');

/**
 * @typedef {Object} InterestType
 * @property {number} id
 * @property {Date} fromDate
 * @property {Date} toDate
 * @property {number} amount
 * @property {InterestStatusEnum} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} pawnTicketId
 */

const Interest = sequelize.define(
  'interest',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        InterestStatusEnum.UPCOMING,
        InterestStatusEnum.DUE,
        InterestStatusEnum.PAID,
        InterestStatusEnum.OVERDUE,
      ),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Interest;

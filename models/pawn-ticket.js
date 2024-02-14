const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');

/**
 * @typedef {Object} PawnTicketType
 * @property {number} id
 * @property {Date} pawnDate
 * @property {Date} dueDate
 * @property {number} principalAmount
 * @property {number} interestRate
 * @property {PawnTicketStatusEnum} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} branchId
 * @property {number} customerId
 */

const PawnTicket = sequelize.define(
  'pawn_ticket',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pawnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    principalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        PawnTicketStatusEnum.INITIAL,
        PawnTicketStatusEnum.ONGOING,
        PawnTicketStatusEnum.COMPLETE,
      ),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = PawnTicket;

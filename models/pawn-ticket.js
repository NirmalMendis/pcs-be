const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');

/**
 * @typedef {Object} PawnTicketType
 * @property {number} id
 * @property {number} revision
 * @property {Date} pawnDate
 * @property {Date} dueDate
 * @property {number} principalAmount
 * @property {number} serviceCharge
 * @property {number} interestRate
 * @property {PawnTicketStatusEnum} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} customerId
 * @property {number} invoiceId
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
    revision: {
      type: DataTypes.INTEGER,
    },
    pawnDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    principalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    serviceCharge: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    interestRate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        PawnTicketStatusEnum.ACTIVE,
        PawnTicketStatusEnum.DUE,
        PawnTicketStatusEnum.FORFEITED,
        PawnTicketStatusEnum.RECOVERED,
      ),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = PawnTicket;

const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');
const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');
const calculateMonthlyInterestFn = require('../helpers/business-logic/calculate-monthly-interest');
const { addMonths } = require('date-fns');

/**
 * @typedef {Object} PawnTicketType
 * @property {number} id
 * @property {number} revision
 * @property {Date} pawnDate
 * @property {Date} dueDate
 * @property {number} periodInMonths
 * @property {number} principalAmount
 * @property {number} serviceCharge
 * @property {number} interestRate
 * @property {number} monthlyInterest
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
    periodInMonths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
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
    monthlyInterest: {
      type: DataTypes.VIRTUAL,
      get() {
        return calculateMonthlyInterestFn(
          this.principalAmount,
          this.interestRate,
        );
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    hooks: {
      beforeUpdate: (pawnTicket) => {
        pawnTicket.dueDate = addMonths(
          pawnTicket.pawnDate,
          +pawnTicket.periodInMonths,
        );
      },
      beforeCreate: (pawnTicket) => {
        pawnTicket.dueDate = addMonths(
          pawnTicket.pawnDate,
          +pawnTicket.periodInMonths,
        );
      },
    },
  },
);

module.exports = PawnTicket;

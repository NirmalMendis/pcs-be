const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');

/**
 * @typedef {Object} InvoiceType
 * @property {number} id
 * @property {string} htmlContent
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} pawnTicketId
 */

const Invoice = sequelize.define(
  'invoice',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    htmlContent: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Invoice;

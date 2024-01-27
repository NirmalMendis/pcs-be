const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @typedef {Object} ItemType
 * @property {number} id
 * @property {string} description
 * @property {number} caratage
 * @property {number} appraisedValue
 * @property {number} pawningAmount
 * @property {number} weight
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} branchId
 * @property {number} customerId
 * @property {number} pawnTicketId
 * @property {number} RedemptionId
 */

const Item = sequelize.define(
  'item',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    caratage: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    appraisedValue: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pawningAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Item;

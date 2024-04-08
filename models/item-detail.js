const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');

/**
 * @typedef {Object} ItemDetailType
 * @property {number} id
 * @property {string} type
 * @property {string} value
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 * @property {number} itemId
 */

const ItemDetails = sequelize.define(
  'item_details',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = ItemDetails;

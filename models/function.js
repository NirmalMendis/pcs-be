const DataTypes = require('sequelize');
const sequelize = require('../utils/database');

/**
 * @enum {string}
 * @readonly
 */
const CategoryEnum = {
  GENERAL: 'General',
  SETTINGS: 'Settings',
  TICKETING: 'Ticketing',
};

/**
 * @typedef {Object} FunctionType
 * @property {number} id
 * @property {string} functionName
 * @property {CategoryEnum} category
 * @property {boolean} view
 * @property {boolean} create
 * @property {boolean} update
 * @property {boolean} delete
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const Function = sequelize.define(
  'function',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    functionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        CategoryEnum.GENERAL,
        CategoryEnum.SETTINGS,
        CategoryEnum.TICKETING,
      ),
      allowNull: false,
    },
    view: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    update: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Function;
exports.CategoryEnum = CategoryEnum;

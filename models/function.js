const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const { CategoryEnum } = require('../utils/constants/generic-constantss');

/**
 * @typedef {Object} FunctionType
 * @property {number} id
 * @property {string} title
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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(CategoryEnum.PAWN_TICKET, CategoryEnum.CUSTOMER),
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

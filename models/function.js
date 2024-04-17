const DataTypes = require('sequelize');
const { sequelize } = require('../utils/database');

/**
 * @typedef {Object} FunctionType
 * @property {number} id
 * @property {string} title
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
    description: {
      type: DataTypes.STRING,
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

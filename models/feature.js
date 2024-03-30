const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const { FeatureEnum } = require('../utils/constants/db-enums');

/**
 * @typedef {Object} FeatureType
 * @property {number} id
 * @property {string} description
 * @property {FeatureEnum} featureType
 * @property {boolean} value
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const Feature = sequelize.define(
  'feature',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    featureType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

module.exports = Feature;

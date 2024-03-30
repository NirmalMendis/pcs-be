const DataTypes = require('sequelize');
const sequelize = require('../utils/database');
const { SettingEnum } = require('../utils/constants/db-enums');

/**
 * @typedef {Object} SettingType
 * @property {number} id
 * @property {string} description
 * @property {SettingEnum} settingType
 * @property {string} value
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} deletedAt
 */

const Setting = sequelize.define(
  'setting',
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
    settingType: {
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

module.exports = Setting;

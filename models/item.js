const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const Item = sequelize.define(
  "item",
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
  }
);

module.exports = Item;

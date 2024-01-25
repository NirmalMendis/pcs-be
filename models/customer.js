const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const Customer = sequelize.define(
  "customer",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nicNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    address: DataTypes.STRING,
  },
  {
    paranoid: true,
  }
);

module.exports = Customer;

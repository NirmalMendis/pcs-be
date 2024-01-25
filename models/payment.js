const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const Payment = sequelize.define(
  "payment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Payment;

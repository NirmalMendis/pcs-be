const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const Redemption = sequelize.define(
  "redemption",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    redemption_date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    amount_paid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    remaining_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = Redemption;

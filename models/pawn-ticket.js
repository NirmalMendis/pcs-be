const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const PawnTicket = sequelize.define(
  "pawn_ticket",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    pawn_date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    principal_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    interest_rate: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Initial", "Ongoing", "Complete"),
      allowNull: false,
    },
  },
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = PawnTicket;

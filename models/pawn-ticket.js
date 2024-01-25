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
    pawnDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    principalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    interestRate: {
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
  }
);

module.exports = PawnTicket;

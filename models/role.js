const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = Role;

const DataTypes = require("sequelize");
const sequelize = require("../utils/database");

const RoleConnectFunction = sequelize.define(
  "role_connect_function",
  {
    action: {
      type: DataTypes.ENUM("view", "create", "update", "delete"),
      allowNull: false,
    },
  },
  {
    paranoid: true,
  }
);

module.exports = RoleConnectFunction;

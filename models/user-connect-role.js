const sequelize = require("../utils/database");

const UserConnectRole = sequelize.define(
  "user_connect_role",
  {},
  {
    paranoid: true,
    underscored: true,
  }
);

module.exports = UserConnectRole;

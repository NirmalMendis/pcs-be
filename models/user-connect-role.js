const sequelize = require("../utils/database");

const UserConnectRole = sequelize.define(
  "user_connect_role",
  {},
  {
    paranoid: true,
  }
);

module.exports = UserConnectRole;

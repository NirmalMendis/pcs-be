const Branch = require("../models/branch");
const Customer = require("../models/customer");
const Function = require("../models/function");
const Item = require("../models/item");
const PawnTicket = require("../models/pawn-ticket");
const Payment = require("../models/payment");
const Redemption = require("../models/redemption");
const Role = require("../models/role");
const RoleConnectFunction = require("../models/role-connect-function");
const User = require("../models/user");
const UserConnectRole = require("../models/user-connect-role");

Function.belongsToMany(Role, {
  through: { model: RoleConnectFunction, unique: false },
});
Role.belongsToMany(Function, {
  through: { model: RoleConnectFunction, unique: false },
});

Role.belongsToMany(User, { through: { model: UserConnectRole } });
User.belongsToMany(Role, { through: { model: UserConnectRole } });

Item.belongsTo(User, { as: "lastUpdatedBy" });
Item.belongsTo(Branch);
PawnTicket.belongsTo(Branch);
Payment.belongsTo(Branch);
Redemption.belongsTo(Branch);

User.belongsTo(Branch);

Customer.hasMany(PawnTicket);
Customer.hasMany(Item);

PawnTicket.hasMany(Item);
PawnTicket.hasMany(Payment);
PawnTicket.hasMany(Redemption);

Redemption.hasMany(Item);

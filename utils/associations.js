const Branch = require('../models/branch');
const Customer = require('../models/customer');
const Function = require('../models/function');
const Interest = require('../models/interest');
const Invoice = require('../models/invoice');
const Item = require('../models/item');
const ItemDetails = require('../models/item-detail');
const PawnTicket = require('../models/pawn-ticket');
const Payment = require('../models/payment');
const Redemption = require('../models/redemption');
const Role = require('../models/role');
const RoleConnectFunction = require('../models/role-connect-function');
const Settings = require('../models/setting');
const User = require('../models/user');
const UserConnectBranch = require('../models/user-connect-branch');
const UserConnectRole = require('../models/user-connect-role');

Function.belongsToMany(Role, {
  through: { model: RoleConnectFunction, unique: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
Role.belongsToMany(Function, {
  through: { model: RoleConnectFunction, unique: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

Role.belongsToMany(User, {
  through: { model: UserConnectRole, unique: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});
User.belongsToMany(Role, {
  through: { model: UserConnectRole, unique: false },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
});

PawnTicket.belongsTo(Branch);

User.belongsTo(Branch, { as: 'activeBranch' });
User.belongsToMany(Branch, {
  through: { model: UserConnectBranch, unique: false },
});
Branch.belongsToMany(User, {
  through: { model: UserConnectBranch, unique: false },
});

Customer.hasMany(PawnTicket);

PawnTicket.belongsTo(Customer);
PawnTicket.hasMany(Item);
Item.belongsTo(PawnTicket);
PawnTicket.hasMany(Payment);
PawnTicket.hasMany(Redemption);
PawnTicket.belongsTo(Invoice);
PawnTicket.hasMany(Interest);
Interest.belongsTo(PawnTicket);

Redemption.hasMany(Item);

Branch.belongsTo(User, { as: 'lastUpdatedBy' });
Customer.belongsTo(User, { as: 'lastUpdatedBy' });
Item.belongsTo(User, { as: 'lastUpdatedBy' });
PawnTicket.belongsTo(User, { as: 'lastUpdatedBy' });
Payment.belongsTo(User, { as: 'lastUpdatedBy' });
Redemption.belongsTo(User, { as: 'lastUpdatedBy' });
Role.belongsTo(User, { as: 'lastUpdatedBy' });
Invoice.belongsTo(User, { as: 'lastUpdatedBy' });
Settings.belongsTo(User, { as: 'lastUpdatedBy' });

Item.hasMany(ItemDetails, { as: 'itemDetails', foreignKey: 'itemId' });
ItemDetails.belongsTo(Item, { as: 'itemDetails', foreignKey: 'itemId' });

User.belongsTo(User, { as: 'lastUpdatedBy' });

const { DataTypes, Transaction } = require('sequelize');
const { sequelize } = require('../utils/database');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { BranchType } = require('./branch');
const { RoleType } = require('./role');

/**
 * @typedef {Object} UserType
 * @property {number} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} mobileNo
 * @property {string} passwordResetToken
 * @property {string} passwordResetExpires
 * @property {string} passwordResetAttempts
 * @property {number} activeBranchId
 * @property {BranchType[]} branches
 * @property {RoleType[]} branches
 */

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.VIRTUAL,
    },
    passkey: DataTypes.STRING,
    mobileNo: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    passwordResetAttempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['passkey'],
      },
    },
    paranoid: true,
    hooks: {
      beforeUpdate: async (user) => {
        if (user.password) {
          user.passkey = await bcrypt.hash(user.email + user.password, 12);
        }
      },
      afterCreate: (record) => {
        delete record.dataValues.passkey;
        delete record.dataValues.password;
      },
    },
    scopes: {
      setNewPassword: {
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'passwordResetAttempts',
          'passwordResetToken',
          'passwordResetExpires',
        ],
      },
      login: {
        attributes: ['id', 'firstName', 'lastName', 'email', 'passkey'],
      },
    },
  },
);

/**
 *
 * @param {Transaction} transaction
 * @returns {string}
 */
User.prototype.createPasswordResetToken = async function (transaction) {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires =
    Date.now() + +process.env.PASSWORD_RESET_EXPIRES_MINS * 60 * 1000;
  await this.save({ transaction });
  return resetToken;
};

/**
 *
 * @param {string} candidateEmail
 * @param {string} candidatePassword
 * @returns
 */
User.prototype.verifyPassword = async function (
  candidateEmail,
  candidatePassword,
) {
  return bcrypt.compare(candidateEmail + candidatePassword, this.passkey);
};

module.exports = User;

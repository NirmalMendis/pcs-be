const sequelize = require('../utils/database');
const User = require('../models/user');
const { Op } = require('sequelize');
const AppError = require('../utils/errors/AppError');
const errorTypes = require('../utils/errors/errors');
const {
  PASSWORD_RESET_ATTEMPT_LIMIT,
} = require('../utils/constants/generic-constantss');
const crypto = require('crypto');
const { UserType } = require('../models/user');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

/**
 * @namespace
 */
const AuthService = {
  /**
   *
   * @param  {string} resetToken
   * @param  {string} email
   * @param  {string} password
   * @returns
   */
  setNewUserPassword: async (email, password, resetToken) => {
    const transaction = await sequelize.transaction();

    try {
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const user = await User.scope('setNewPassword').findOne(
        {
          // include: [
          //   {
          //     model: Role.scope('essential'),
          //     where: {
          //       status: 'Active',
          //     },
          //   },
          // ],
          where: {
            email: email,
            passwordResetToken: hashedToken,
            passwordResetExpires: { [Op.gt]: new Date() },
          },
        },
        { transaction },
      );

      if (!user) {
        throw new AppError(errorTypes.USER.PASSWORD_RESET_TOKEN_INVALID)();
      }

      if (user.passwordResetAttempts >= PASSWORD_RESET_ATTEMPT_LIMIT) {
        throw new AppError(errorTypes.USER.PASSWORD_RESET_ATTEMPT_LIMIT);
      }
      await user.set(
        {
          password: password,
          passwordResetToken: null,
          passwordResetExpires: null,
          passwordResetAttempts: user.passwordResetAttempts + 1,
        },
        {
          transaction,
        },
      );

      await user.save({
        lock: true,
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  /**
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Pick<UserType, 'id' | 'firstName' | 'lastName' | 'email'> | void>}
   */
  login: async (email, password) => {
    const user = await User.scope('login').findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const user = await User.scope('login').findOne({
        where: {
          email,
        },
      });
      if (user) {
        throw new AppError(errorTypes.USER.ACCOUNT_DEACTIVATED);
      }
      // eslint-disable-next-line no-console
      console.log('NO USER !!!');
    }
    if (!user || !(await user.verifyPassword(email, password))) {
      throw new AppError(errorTypes.USER.INCORRECT_EMAIL_PASSWORD);
    }

    return user;
  },
  /**
   *
   * @param {string} refreshToken
   * @param {string} accessToken
   * @returns {Promise<UserType | void>}
   */
  validateTokens: async (refreshToken, accessToken) => {
    await promisify(jwt.verify)(refreshToken, process.env.JWT_SECRET);

    const decodedJWT = await promisify(jwt.verify)(
      accessToken,
      process.env.JWT_SECRET,
    );

    const currentUser = await User.findOne({
      where: {
        email: decodedJWT.email,
      },
    });
    return currentUser;
  },
  /**
   *
   * @param {string} refreshToken
   * @returns {Promise<Pick<UserType, 'id' | 'firstName' | 'lastName' | 'email'> | void>}
   */
  refresh: async (refreshToken) => {
    const decodedRefreshToken = await promisify(jwt.verify)(
      refreshToken,
      process.env.JWT_SECRET,
    );
    const currentUser = await User.findOne({
      where: {
        email: decodedRefreshToken.email,
      },
    });
    return currentUser;
  },
};

module.exports = AuthService;

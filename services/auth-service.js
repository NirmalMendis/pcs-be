const { sequelize } = require('../utils/database');
const User = require('../models/user');
const { Op } = require('sequelize');
const AppError = require('../utils/errors/AppError');
const errorTypes = require('../utils/errors/errors');
const {
  PASSWORD_RESET_ATTEMPT_LIMIT,
  FunctionEnum,
} = require('../utils/constants/generic-constantss');
const crypto = require('crypto');
const { UserType } = require('../models/user');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { PermissionsType } = require('../utils/types');
const logger = require('../utils/logger');
const Role = require('../models/role');
const MetadataService = require('./metadata-service');
const { SettingEnum } = require('../utils/constants/db-enums');
const sendEmail = require('../helpers/shared/email');
const forgotPasswordTemplate = require('../utils/email/templates/forgotPasswordEmail');
const {
  ForgotPwdEmailTemplateDataType,
} = require('../utils/email/templates/forgotPasswordEmail');
const { PermissionActionEnum } = require('../models/role-connect-function');

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
          where: {
            email: email,
            passwordResetToken: hashedToken,
            passwordResetExpires: { [Op.gt]: new Date() },
          },
        },
        { transaction },
      );

      if (!user) {
        throw new AppError(errorTypes.USER.PASSWORD_RESET_TOKEN_INVALID);
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
      logger.error('setNewUserPassword', error);
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

      logger.info('NO USER !!!');
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
  /**
   *
   * @param {number} id
   * @param {FunctionEnum} permission
   * @param {PermissionActionEnum} action
   * @returns {Promise<boolean | void>}
   */
  authorize: async (id, permission, action) => {
    const permissions = await AuthService.getUserPermissions(id, true);

    const hasPermission = permissions.find(
      (dbPermission) =>
        dbPermission.title === permission && dbPermission.action === action,
    );

    return !!hasPermission;
  },
  /**
   *
   * @param {number} id
   * @returns {Promise<PermissionsType>}
   */
  getUserPermissions: async (id, raw = false) => {
    const permissions = await sequelize.query(
      'SELECT f.title, rcf.action FROM functions f INNER JOIN role_connect_functions rcf ON rcf.functionId = f.id INNER JOIN user_connect_roles ucr ON ucr.roleId = rcf.roleId WHERE ucr.userId = ?',
      {
        replacements: [id],
        type: sequelize.QueryTypes.SELECT,
      },
    );

    /**
     * @type {PermissionsType}
     */
    const permissionsByAction = {
      view: [],
      create: [],
      update: [],
      delete: [],
    };

    for (const func of permissions) {
      permissionsByAction[func.action].push({
        title: func.title,
        category: func.category,
      });
    }

    return raw ? permissions : permissionsByAction;
  },
  /**
   *
   * @param {string} email
   * @returns {Promise<void>}
   */
  forgotPassword: async (email) => {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.scope('setNewPassword').findOne(
        {
          where: {
            email: email,
          },
          include: [
            {
              model: Role.scope('essential'),
              where: {
                status: 'Active',
              },
              required: true, // This ensures that only users with at least one active role are returned
            },
          ],
        },
        { transaction },
      );

      if (!user) {
        const userWithouRole = await User.scope('setNewPassword').findOne(
          {
            where: {
              email: email,
            },
          },
          { transaction },
        );

        if (userWithouRole) {
          throw new AppError(errorTypes.USER.ACCOUNT_DEACTIVATED);
        }
        logger.info('NO USER !!!');
        throw new AppError(errorTypes.USER.NO_USER_FORGOT_PASSWORD);
      }

      if (user.passwordResetAttempts >= PASSWORD_RESET_ATTEMPT_LIMIT) {
        throw new AppError(errorTypes.USER.PASSWORD_RESET_ATTEMPT_LIMIT);
      }

      if (user.passwordResetAttempts >= PASSWORD_RESET_ATTEMPT_LIMIT) {
        throw new AppError(errorTypes.USER.PASSWORD_RESET_ATTEMPT_LIMIT);
      }
      await user.set(
        {
          passwordResetAttempts: user.passwordResetAttempts + 1,
        },
        {
          transaction,
        },
      );

      const resetToken = await user.createPasswordResetToken(transaction);

      await user.save({
        lock: true,
        transaction,
      });

      const companyName = await MetadataService.findSetting(
        SettingEnum.COMPANY_NAME,
      );

      /**
       * @type {ForgotPwdEmailTemplateDataType}
       */
      const emailData = {
        companyName: companyName.value,
        firstName: user.firstName,
        redirectURL:
          process.env.FRONTEND_URL +
          `/set-new-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(user.email)}`,
      };

      await sendEmail({
        email: email,
        subject: 'Reset your password',
        html: forgotPasswordTemplate(emailData),
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      logger.error('forgotPassword', error);
      throw error;
    }
  },
};

module.exports = AuthService;

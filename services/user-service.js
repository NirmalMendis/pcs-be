const sendEmail = require('../helpers/shared/email');
const User = require('../models/user');
const { UserType } = require('../models/user');
const { BranchType } = require('../models/branch');
const { sequelize } = require('../utils/database');
const welcomeTemplate = require('../utils/email/templates/welcomeEmail');
const {
  WelcomeEmailTemplateDataType,
} = require('../utils/email/templates/welcomeEmail');
const { getUserPermissions } = require('./auth-service');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const errorTypes = require('../utils/errors/errors');
const AppError = require('../utils/errors/AppError');
const MetadataService = require('./metadata-service');
const { SettingEnum } = require('../utils/constants/db-enums');
const logger = require('../utils/logger');

/**
 * @namespace
 */
const UserService = {
  /**
   * @param {Pick<UserType, 'firstName' | 'lastName' | 'email' | 'activeBranchId' | 'mobileNo'> & {branches: Array<number>} &{roles: Array<number>}} userData
   * @returns {Promise<(UserType | void)>}
   */
  createUser: async (userData) => {
    const {
      firstName,
      lastName,
      email,
      activeBranchId,
      mobileNo,
      branches,
      roles,
    } = userData;

    const transaction = await sequelize.transaction();
    try {
      const newUser = await User.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          activeBranchId: activeBranchId,
        },
        { transaction },
      );
      await newUser.addBranches(branches, { transaction });
      await newUser.setRoles(roles, { transaction });
      const resetToken = await newUser.createPasswordResetToken(transaction);

      const companyName = await MetadataService.findSetting(
        SettingEnum.COMPANY_NAME,
      );

      /**
       * @type {WelcomeEmailTemplateDataType}
       */
      const emailData = {
        companyName: companyName.value,
        firstName: newUser.firstName,
        redirectURL:
          process.env.FRONTEND_URL +
          `/set-new-password?token=${encodeURIComponent(resetToken)}&email=${encodeURIComponent(newUser.email)}`,
      };

      //send welcome email /
      await sendEmail({
        email: email,
        subject: 'Welcome to Assetank',
        html: welcomeTemplate(emailData),
        transaction,
      });

      await transaction.commit();

      return newUser;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
  /**
   * @param {Pick<BranchType, 'id' >} branchId
   * @param {Pick<UserType, 'id' >} userId
   * @returns {Promise<(void)>}
   */
  updateActiveBranch: async (branchId, userId) => {
    const transaction = await sequelize.transaction();
    try {
      const user = await User.findByPk(userId, {
        transaction,
      });

      await user.setActiveBranch(branchId);
      await user.save({
        lock: true,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
  /**
   * @param {UserType} user
   * @param {string} accessToken
   * @returns {Promise<(void)>}
   */
  getUserPermissions: async (user, accessToken) => {
    const permissions = await getUserPermissions(user.id);
    const decodedJWT = await promisify(jwt.verify)(
      accessToken,
      process.env.JWT_SECRET,
    );

    const isPermissionsIntact =
      decodedJWT.permissionsHash ===
      crypto
        .createHash('sha256')
        .update(JSON.stringify(permissions))
        .digest('hex');

    if (isPermissionsIntact) {
      return permissions;
    } else {
      throw new AppError(errorTypes.USER.JWT_ROLES_PERMISSIONS_MISMATCH);
    }
  },
  resetPasswordChangeLimit: async () => {
    const transaction = await sequelize.transaction();

    try {
      await User.update(
        { passwordResetAttempts: 0 },
        { where: {}, transaction },
      );
      await transaction.commit();
      logger.info('Password change limit resetted');
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};

module.exports = UserService;

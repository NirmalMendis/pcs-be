const sendEmail = require('../helpers/shared/email');
const User = require('../models/user');
const { UserType } = require('../models/user');
const { BranchType } = require('../models/branch');
const sequelize = require('../utils/database');
const welcomeTemplate = require('../utils/email/templates/welcomeEmail');
const BranchService = require('./branch-service');
const {
  WelcomeEmailTemplateDataType,
} = require('../utils/email/templates/welcomeEmail');

/**
 * @namespace
 */
const UserService = {
  /**
   * @param {Pick<UserType, 'firstName' | 'lastName' | 'email' | 'activeBranchId' | 'mobileNo' | 'branches'>} userData
   * @returns {Promise<(UserType | void)>}
   */
  createUser: async (userData) => {
    const { firstName, lastName, email, activeBranchId, mobileNo, branches } =
      userData;

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
      const resetToken = await newUser.createPasswordResetToken(transaction);

      const mainBranchProfile = await BranchService.findBranch(
        { where: { isMainBranch: true } },
        {
          transaction,
        },
      );

      /**
       * @type {WelcomeEmailTemplateDataType}
       */
      const emailData = {
        branch: mainBranchProfile,
        user: { ...newUser.get({ plain: true }) },
        redirectURL:
          process.env.FRONTEND_URL +
          `/password-reset?token=${resetToken}&email=${newUser.email}`,
      };

      await sendEmail({
        email: email,
        subject: 'Welcome to Pawn center system',
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
};

module.exports = UserService;

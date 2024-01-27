const sendEmail = require('../../helpers/shared/email');
const User = require('../../models/user');
const { UserType } = require('../../models/user');
const sequelize = require('../../utils/database');
const welcomeTemplate = require('../../utils/email/templates/welcomeEmail');
const BranchService = require('../branch-service/branch-service');
const {
  WelcomeEmailTemplateDataType,
} = require('../../utils/email/templates/welcomeEmail');

/**
 * @namespace
 */
const UserService = {
  /**
   * @param {Pick<UserType, 'firstName' | 'lastName' | 'email' | 'branchId' | 'mobileNo'>} userData
   * @returns {Promise<(UserType | void)>}
   */
  createUser: async (userData) => {
    const { firstName, lastName, email, branchId, mobileNo } = userData;

    const transaction = await sequelize.transaction();
    try {
      /**
       * @type {UserType}
       */
      const newUser = await User.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobileNo: mobileNo,
          branchId: branchId,
        },
        { transaction },
      );

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
};

module.exports = UserService;

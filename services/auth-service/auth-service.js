const sequelize = require('../../utils/database');
const User = require('../../models/user');
const { Op } = require('sequelize');
const AppError = require('../../utils/errors/AppError');
const errorTypes = require('../../utils/errors/errors');
const {
  PASSWORD_RESET_ATTEMPT_LIMIT,
} = require('../../utils/constants/generic-constantss');
const crypto = require('crypto');

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
};

module.exports = AuthService;

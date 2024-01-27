const sendSuccessResponse = require('../helpers/shared/successResponse');
const AuthService = require('../services/auth-service/auth-service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errors/AppError');
const errorTypes = require('../utils/errors/errors');

/**
 * @namespace
 */
const AuthController = {
  setNewUserPassword: catchAsync(async (req, res, next) => {
    try {
      const { email, resetToken, password } = req.body;
      if (!email) {
        return next(new AppError(errorTypes.USER.MISSING_EMAIL_OR_RESET_TOKEN));
      }

      await AuthService.setNewUserPassword(email, password, resetToken);
      sendSuccessResponse(res, {});
    } catch (error) {
      next(error);
    }
  }),
};

module.exports = AuthController;

const { sendResponseWithJWT } = require('../helpers/jwt/jwt-handler');
const sendSuccessResponse = require('../helpers/shared/success-response');
const AuthService = require('../services/auth-service/auth-service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errors/AppError');
const errorTypes = require('../utils/errors/errors');

/**
 * @namespace
 */
const AuthController = {
  setNewUserPassword: catchAsync(async (req, res, next) => {
    const { email, resetToken, password } = req.body;
    if (!email) {
      return next(new AppError(errorTypes.USER.MISSING_EMAIL_OR_RESET_TOKEN));
    }

    await AuthService.setNewUserPassword(email, password, resetToken);
    sendSuccessResponse(res, {});
  }),

  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError(errorTypes.USER.MISSING_USERNAME_PASSWORD));
    }

    const user = await AuthService.login(email, password);
    sendResponseWithJWT(user, res);
  }),
};

module.exports = AuthController;

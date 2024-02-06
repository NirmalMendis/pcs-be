const { StatusCodes } = require('http-status-codes');
const { sendResponseWithJWT } = require('../helpers/jwt/jwt-handler');
const sendSuccessResponse = require('../helpers/shared/success-response');
const AuthService = require('../services/auth-service/auth-service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/errors/AppError');
const { USER } = require('../utils/errors/errors');

/**
 * @namespace
 */
const AuthController = {
  setNewUserPassword: catchAsync(async (req, res, next) => {
    const { email, resetToken, password } = req.body;
    if (!email) {
      return next(new AppError(USER.MISSING_EMAIL_OR_RESET_TOKEN));
    }

    await AuthService.setNewUserPassword(email, password, resetToken);
    sendSuccessResponse(res, {});
  }),

  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError(USER.MISSING_USERNAME_PASSWORD));
    }

    const user = await AuthService.login(email, password);
    sendResponseWithJWT(user, res);
  }),
  logout: catchAsync(async (req, res) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      //secure: req.secure || req.headers["x-forwarded-proto"] === "https",
      //Temp disabled below 2
      secure: true,
      sameSite: 'none',
    });
    sendSuccessResponse(res, {});
  }),
  protect: catchAsync(async (req, res, next) => {
    try {
      let accessToken;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        accessToken = req.headers.authorization.split(' ')[1];
      }
      if (!accessToken) {
        return next(new AppError(USER.MISSING_JWT));
      }

      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return next(new AppError(USER.MISSING_JWT));
      }
      const currentUser = await AuthService.validateTokens(
        refreshToken,
        accessToken,
      );
      if (!currentUser) {
        return next(new AppError(USER.NO_USER_FOR_JWT));
      }

      req.user = currentUser;
      next();
    } catch (error) {
      return next(new AppError(USER.INVALID_JWT, StatusCodes.UNAUTHORIZED));
    }
  }),
};

module.exports = AuthController;

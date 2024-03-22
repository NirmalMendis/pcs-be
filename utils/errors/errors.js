const { StatusCodes } = require('http-status-codes');

const errorTypes = {
  USER: {
    MISSING_USERNAME_PASSWORD: {
      message: 'Please provide email and password',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'USER_01',
    },
    MISSING_EMAIL: {
      message: 'Please provide your email address',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'USER_02',
    },
    INCORRECT_EMAIL_PASSWORD: {
      message: 'Incorrect email or password',
      statusCode: StatusCodes.UNAUTHORIZED,
      errorCode: 'USER_03',
    },
    ACCOUNT_DEACTIVATED: {
      message:
        'Your account access has been restricted. Contact Administrator for support.',
      statusCode: StatusCodes.UNAUTHORIZED,
      errorCode: 'USER_04',
    },
    MISSING_JWT: {
      message: 'You are not logged in! Please login to continue.',
      statusCode: StatusCodes.UNAUTHORIZED,
      errorCode: 'USER_05',
    },
    INVALID_JWT: {
      message: 'JWT is invalid or expired',
      statusCode: StatusCodes.UNAUTHORIZED,
      errorCode: 'USER_06',
    },
    NO_USER_FOR_JWT: {
      message: 'Authorization Failed.',
      statusCode: StatusCodes.UNAUTHORIZED,
      errorCode: 'USER_07',
    },
    MISSING_EMAIL_OR_RESET_TOKEN: {
      message: 'Sorry! you are not authorized to perform this action.',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'USER_08',
    },
    PASSWORD_RESET_TOKEN_INVALID: {
      message: 'Sorry! The password reset token is no longer valid.',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'USER_09',
    },
    PASSWORD_RESET_ATTEMPT_LIMIT: {
      message:
        'Sorry, you have reached the maximum number of password reset attempts. Please try again tomorrow.',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'USER_10',
    },
    JWT_ROLES_PERMISSIONS_MISMATCH: {
      message:
        'Your roles and/or permissions have been updated. Please login to continue.',
      statusCode: StatusCodes.UNAUTHORIZED,
    },
    NO_USER_FORGOT_PASSWORD: {
      message: 'An email has been sent to your account.',
      statusCode: StatusCodes.BAD_REQUEST,
    },
  },
  GENERIC: {
    INVALID_ROUTE: {
      message: (originalUrl) => `Cannot find ${originalUrl} on this server`,
      statusCode: StatusCodes.NOT_FOUND,
      errorCode: 'GENERIC_01',
    },
    MISSING_FIELDS: {
      message: 'Sorry! Something went wrong while creating this resource',
      statusCode: StatusCodes.BAD_REQUEST,
      errorCode: 'GENERIC_02',
    },
    GENERIC_FAILURE: {
      message: 'Sorry! Something went wrong!',
      statusCode: StatusCodes.BAD_REQUEST,
    },
  },
};

module.exports = errorTypes;

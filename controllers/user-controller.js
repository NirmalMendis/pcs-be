const sendSuccessResponse = require("../helpers/shared/successResponse");
const UserService = require("../services/user-service/user-service");
const catchAsync = require("../utils/catchAsync");

const UserController = {
  createUser: catchAsync(async (req, res, next) => {
    try {
      const newUser = await UserService.createUser(req.body);
      sendSuccessResponse(res, newUser);
    } catch (error) {
      next(error);
    }
  }),
};

module.exports = UserController;

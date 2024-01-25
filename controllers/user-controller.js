const UserService = require("../services/user-service/user-service");

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

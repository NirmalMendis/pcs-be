const sendSuccessResponse = require("../../helpers/shared/successResponse");
const User = require("../../models/user");
const sequelize = require("../../utils/database");

const UserService = {
  createUser: async (userData) => {
    const { firstName, lastName, email, password, mobileNo } = userData;

    const transaction = await sequelize.transaction();
    try {
      const newUser = await User.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          mobileNo: mobileNo,
        },
        { transaction }
      );

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

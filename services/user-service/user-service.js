const sendSuccessResponse = require("../../helpers/shared/successResponse");
const User = require("../../models/user");
const sequelize = require("../../utils/database");

const UserService = {
  createUser: async (userData) => {
    const { name, email, password, ...otherFields } = userData;

    const transaction = await sequelize.transaction();
    try {
      const newUser = await User.create(
        {
          name: req.body.name,
          email: req.body.email,
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

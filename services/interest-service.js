const { startOfDay } = require('date-fns');
const { sequelize } = require('../utils/database');
const Interest = require('../models/interest');
const { InterestStatusEnum } = require('../utils/constants/db-enums');
const { Op } = require('sequelize');

/**
 * @namespace
 */
const InterestService = {
  updateStatusesJob: async () => {
    const transaction = await sequelize.transaction();

    try {
      const yesterdayMidnight = startOfDay(new Date());
      const interestsToUpdate = await Interest.findAll({
        where: {
          status: InterestStatusEnum.UPCOMING,
          toDate: {
            [Op.lt]: yesterdayMidnight,
          },
        },
        transaction,
      });

      await Interest.update(
        { status: InterestStatusEnum.DUE },
        {
          where: {
            id: interestsToUpdate.map((interest) => interest.id),
          },
          transaction,
        },
      );

      // eslint-disable-next-line no-console
      console.log(
        `Tickets updated at ${new Date().toLocaleDateString()} for`,
        yesterdayMidnight.toLocaleString(),
      );
      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
module.exports = InterestService;

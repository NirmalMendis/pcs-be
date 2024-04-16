const { startOfDay } = require('date-fns');
const { sequelize } = require('../utils/database');
const Interest = require('../models/interest');
const { InterestStatusEnum } = require('../utils/constants/db-enums');
const { Op } = require('sequelize');
const logger = require('../utils/logger');

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

      await transaction.commit();
      logger.info('Interest statuses updated');
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};
module.exports = InterestService;

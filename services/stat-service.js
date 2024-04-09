const { Op } = require('sequelize');
const Interest = require('../models/interest');
const PawnTicket = require('../models/pawn-ticket');
const {
  PawnTicketStatusEnum,
  InterestStatusEnum,
} = require('../utils/constants/db-enums');
const { startOfMonth, endOfMonth, startOfDay, endOfDay } = require('date-fns');

/**
 * @namespace
 */
const StatService = {
  /**
   * @param {number} activeBranchId
   * @returns {Promise<object>}
   */
  getTicketStatusStats: async (activeBranchId) => {
    const totalActiveCount = await PawnTicket.count({
      where: {
        status: PawnTicketStatusEnum.ACTIVE,
        branchId: activeBranchId,
      },
    });

    const now = new Date('2024-06-07');
    const startOfCurrentMonth = startOfMonth(now);
    const endOfCurrentMonth = endOfMonth(now);
    const startOfToday = startOfDay(now);
    const endOfToday = endOfDay(now);

    const activeTicketsInMonth = await PawnTicket.findAll({
      where: {
        status: PawnTicketStatusEnum.ACTIVE,
      },
      include: [
        {
          model: Interest,
          as: 'interests',
          where: {
            [Op.or]: [
              {
                toDate: {
                  [Op.between]: [startOfCurrentMonth, endOfCurrentMonth],
                },
              },
              {
                toDate: {
                  [Op.lt]: startOfCurrentMonth,
                },
                status: InterestStatusEnum.DUE,
              },
            ],
          },
        },
      ],
    });

    let totalInterestsInMonth = 0;
    let totalInterestsToday = 0;

    activeTicketsInMonth.forEach((pawnTicket) => {
      pawnTicket.interests.forEach((interest) => {
        if (interest.toDate >= startOfToday && interest.toDate <= endOfToday) {
          totalInterestsToday += interest.amount;
        }
        totalInterestsInMonth += interest.amount;
      });
    });

    return {
      active: {
        total: totalActiveCount,
        month: parseFloat(totalInterestsInMonth.toFixed(2)),
        today: parseFloat(totalInterestsToday.toFixed(2)),
      },
    };
  },
};

module.exports = StatService;

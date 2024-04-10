const { Op } = require('sequelize');
const Interest = require('../models/interest');
const PawnTicket = require('../models/pawn-ticket');
const {
  PawnTicketStatusEnum,
  InterestStatusEnum,
} = require('../utils/constants/db-enums');
const { startOfMonth, endOfMonth, startOfDay, endOfDay } = require('date-fns');
const getTotalInterestForTickets = require('../helpers/business-logic/get-interest-total-for-tickets');

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
        branchId: activeBranchId,
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
                status: {
                  [Op.or]: [
                    InterestStatusEnum.UPCOMING,
                    InterestStatusEnum.DUE,
                  ],
                },
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

    const totalDueCount = await PawnTicket.count({
      where: {
        status: PawnTicketStatusEnum.DUE,
        branchId: activeBranchId,
      },
    });

    const allDueTickets = await PawnTicket.findAll({
      where: {
        status: PawnTicketStatusEnum.DUE,
        branchId: activeBranchId,
      },
      include: [
        {
          model: Interest,
          as: 'interests',
          where: {
            status: {
              [Op.not]: InterestStatusEnum.PAID,
            },
          },
        },
      ],
    });

    const totalRecoveredCount = await PawnTicket.count({
      where: {
        status: PawnTicketStatusEnum.RECOVERED,
        branchId: activeBranchId,
      },
    });

    const allRecoveredTickets = await PawnTicket.findAll({
      where: {
        status: PawnTicketStatusEnum.RECOVERED,
        branchId: activeBranchId,
      },
      include: [
        {
          model: Interest,
          as: 'interests',
          where: {
            status: InterestStatusEnum.PAID,
          },
        },
      ],
    });

    const totalForfeitedCount = await PawnTicket.count({
      where: {
        status: PawnTicketStatusEnum.FORFEITED,
        branchId: activeBranchId,
      },
    });

    const allForfeitedTickets = await PawnTicket.findAll({
      where: {
        status: PawnTicketStatusEnum.FORFEITED,
        branchId: activeBranchId,
      },
      include: [
        {
          model: Interest,
          as: 'interests',
          where: {
            status: {
              [Op.not]: InterestStatusEnum.PAID,
            },
          },
        },
      ],
    });

    return {
      [PawnTicketStatusEnum.ACTIVE]: {
        totalCount: totalActiveCount,
        month: parseFloat(totalInterestsInMonth.toFixed(2)),
        today: parseFloat(totalInterestsToday.toFixed(2)),
      },
      [PawnTicketStatusEnum.DUE]: {
        totalCount: totalDueCount,
        totalValue: getTotalInterestForTickets(allDueTickets),
      },
      [PawnTicketStatusEnum.RECOVERED]: {
        totalCount: totalRecoveredCount,
        totalValue: getTotalInterestForTickets(allRecoveredTickets),
      },
      [PawnTicketStatusEnum.FORFEITED]: {
        totalCount: totalForfeitedCount,
        totalValue: getTotalInterestForTickets(allForfeitedTickets),
      },
    };
  },
};

module.exports = StatService;

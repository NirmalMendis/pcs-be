const sendSuccessResponse = require('../helpers/shared/success-response');
const PawnTicketService = require('../services/pawn-ticket-service');
const catchAsync = require('../utils/catchAsync');
const DbFactoryService = require('../services/db-factory-service');
const PawnTicket = require('../models/pawn-ticket');
const Customer = require('../models/customer');
const Item = require('../models/item');
const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');

/**
 * @namespace
 */
const PawnTicketController = {
  createPawnTicket: catchAsync(async (req, res) => {
    const pawnTicket = await PawnTicketService.createPawnTicket({
      ...req.body,
      branchId: req.user.activeBranchId || req.body.branchId,
      status: PawnTicketStatusEnum.ACTIVE,
    });
    sendSuccessResponse(res, pawnTicket);
  }),
  getAllPawnTickets: async (req, res) =>
    DbFactoryService.getAll(PawnTicket, {
      include: [Customer],
      where: {
        branchId: req.user.activeBranchId,
      },
    })(req, res),
  getTicketById: DbFactoryService.getOne(PawnTicket, {
    include: [Customer, Item],
  }),
  getMonthlyInterestValue: catchAsync(async (req, res) => {
    const monthlyInterest = PawnTicketService.calculateMonthlyInterest(
      req.query.principalAmount,
      req.query.interestRate,
    );
    sendSuccessResponse(res, { monthlyInterest });
  }),
};

module.exports = PawnTicketController;

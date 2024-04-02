const sendSuccessResponse = require('../helpers/shared/success-response');
const PawnTicketService = require('../services/pawn-ticket-service');
const catchAsync = require('../utils/catchAsync');
const DbFactoryService = require('../services/db-factory-service');
const PawnTicket = require('../models/pawn-ticket');
const Customer = require('../models/customer');
const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');

/**
 * @namespace
 */
const PawnTicketController = {
  // eslint-disable-next-line no-unused-vars
  createPawnTicket: catchAsync(async (req, res, next) => {
    const pawnTicket = await PawnTicketService.createPawnTicket(
      {
        ...req.body,
        branchId: req.user.activeBranchId || req.body.branchId,
        status: PawnTicketStatusEnum.ACTIVE,
      },
      req.user,
    );
    sendSuccessResponse(res, pawnTicket);
  }),
  // eslint-disable-next-line no-unused-vars
  createPawnTicketRevision: catchAsync(async (req, res, next) => {
    const revisedPawnTicket = await PawnTicketService.createRevision(
      req.params.id,
      req.user,
    );
    sendSuccessResponse(res, revisedPawnTicket);
  }),
  getAllPawnTickets: async (req, res, next) =>
    DbFactoryService.getAll(PawnTicket, {
      include: [Customer],
      where: {
        branchId: req.user.activeBranchId,
      },
    })(req, res, next),
  getTicketById: DbFactoryService.getOne(PawnTicket, {
    include: [Customer],
  }),
  // eslint-disable-next-line no-unused-vars
  getMonthlyInterestValue: catchAsync(async (req, res, next) => {
    const monthlyInterest = PawnTicketService.calculateMonthlyInterest(
      req.query.principalAmount,
      req.query.interestRate,
    );
    sendSuccessResponse(res, { monthlyInterest });
  }),
};

module.exports = PawnTicketController;

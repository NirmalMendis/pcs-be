const sendSuccessResponse = require('../helpers/shared/success-response');
const PawnTicketService = require('../services/pawn-ticket-service');
const catchAsync = require('../utils/catchAsync');
const DbFactoryService = require('../services/db-factory-service');
const PawnTicket = require('../models/pawn-ticket');
const Customer = require('../models/customer');
const { PawnTicketStatusEnum } = require('../utils/constants/db-enums');
const { startOfDay, endOfDay } = require('date-fns');
const { Op } = require('sequelize');

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
  getAllPawnTickets: async (req, res, next) => {
    let where = { branchId: req.user.activeBranchId };

    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (startDate && endDate) {
      const startOfStartDate = startOfDay(req.query.startDate);
      const endOfStartDate = endOfDay(req.query.endDate);

      const startDateCondition = {
        [Op.between]: [startOfStartDate, endOfStartDate],
      };
      const endDateCondition = {
        [Op.between]: [startOfStartDate, endOfStartDate],
      };
      where[Op.or] = [
        { pawnDate: startDateCondition },
        { dueDate: endDateCondition },
      ];
    }

    if (req.query.status) {
      where.status = req.query.status;
    }

    return DbFactoryService.getAll(PawnTicket, {
      include: [Customer],
      where: where,
    })(req, res, next);
  },
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
  // eslint-disable-next-line no-unused-vars
  getRevisionIds: catchAsync(async (req, res, next) => {
    const revisionIds = await PawnTicketService.getRevisionIds(req.params.id);
    sendSuccessResponse(res, revisionIds);
  }),
  // eslint-disable-next-line no-unused-vars
  updateTicketInvoice: catchAsync(async (req, res, next) => {
    await PawnTicketService.updateTicketInvoice(req.params.id, req.user);
    sendSuccessResponse(res);
  }),
  // eslint-disable-next-line no-unused-vars
  updateGeneralDetails: catchAsync(async (req, res, next) => {
    const pawnTicket = await PawnTicketService.updateGeneralDetails(
      { id: req.params.id, ...req.body },
      req.user,
    );
    sendSuccessResponse(res, pawnTicket);
  }),
};

module.exports = PawnTicketController;

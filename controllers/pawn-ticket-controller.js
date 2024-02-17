const sendSuccessResponse = require('../helpers/shared/success-response');
const PawnTicketService = require('../services/pawn-ticket-service/pawn-ticket-service');
const catchAsync = require('../utils/catchAsync');

/**
 * @namespace
 */
const PawnTicketController = {
  createPawnTicket: catchAsync(async (req, res) => {
    const pawnTicket = await PawnTicketService.createPawnTicket(req.body);
    sendSuccessResponse(res, pawnTicket);
  }),
};

module.exports = PawnTicketController;

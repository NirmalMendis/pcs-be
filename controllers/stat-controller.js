const sendSuccessResponse = require('../helpers/shared/success-response');
const StatService = require('../services/stat-service');
const catchAsync = require('../utils/catchAsync');

/**
 * @namespace
 */
const StatController = {
  // eslint-disable-next-line no-unused-vars
  getTicketStatusStats: catchAsync(async (req, res, next) => {
    const stats = await StatService.getTicketStatusStats(
      req.user.activeBranchId,
    );
    sendSuccessResponse(res, stats);
  }),
};

module.exports = StatController;

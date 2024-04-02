const Interest = require('../models/interest');
const DbFactoryService = require('../services/db-factory-service');

/**
 * @namespace
 */
const InterestController = {
  getInterestsForPawnTicket: async (req, res) =>
    DbFactoryService.getAll(Interest, {
      where: {
        pawnTicketId: req.params.id,
      },
    })(req, res),
};

module.exports = InterestController;

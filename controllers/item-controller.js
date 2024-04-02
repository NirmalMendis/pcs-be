const Item = require('../models/item');
const DbFactoryService = require('../services/db-factory-service');

/**
 * @namespace
 */
const ItemController = {
  getItemsForPawnTicket: async (req, res) =>
    DbFactoryService.getAll(Item, {
      where: {
        pawnTicketId: req.params.id,
      },
    })(req, res),
};

module.exports = ItemController;

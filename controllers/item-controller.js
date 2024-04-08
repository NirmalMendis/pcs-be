const Item = require('../models/item');
const ItemDetails = require('../models/item-detail');
const DbFactoryService = require('../services/db-factory-service');

/**
 * @namespace
 */
const ItemController = {
  getItemsForPawnTicket: async (req, res, next) =>
    DbFactoryService.getAll(Item, {
      where: {
        pawnTicketId: req.params.id,
      },
      include: [
        {
          model: ItemDetails,
          as: 'itemDetails',
        },
      ],
    })(req, res, next),
};

module.exports = ItemController;

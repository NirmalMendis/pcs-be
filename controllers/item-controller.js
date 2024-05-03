const sendSuccessResponse = require('../helpers/shared/success-response');
const Item = require('../models/item');
const ItemDetails = require('../models/item-detail');
const DbFactoryService = require('../services/db-factory-service');
const ItemService = require('../services/item-service');
const catchAsync = require('../utils/catchAsync');

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
  // eslint-disable-next-line no-unused-vars
  updateItem: catchAsync(async (req, res, next) => {
    const item = await ItemService.updateItem(
      req.params.id,
      req.body,
      req.user,
    );
    sendSuccessResponse(res, item);
  }),
  // eslint-disable-next-line no-unused-vars
  deleteItem: catchAsync(async (req, res, next) => {
    await ItemService.deleteItem(req.params.id);
    sendSuccessResponse(res);
  }),
  // eslint-disable-next-line no-unused-vars
  addItem: catchAsync(async (req, res, next) => {
    const item = await ItemService.addItem(req.params.id, req.body);
    sendSuccessResponse(res, item);
  }),
};

module.exports = ItemController;

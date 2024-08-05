const { PawnTicketType } = require('../models/pawn-ticket');
const { ItemType } = require('../models/item');
const { GoldItemType, VehicleItemType } = require('../utils/types');
const { sequelize } = require('../utils/database');
const Item = require('../models/item');
const errorTypes = require('../utils/errors/errors');
const AppError = require('../utils/errors/AppError');
const ItemDetails = require('../models/item-detail');
const PawnTicket = require('../models/pawn-ticket');
const logger = require('../utils/logger');

/**
 * @namespace
 */
const ItemService = {
  /**
   *
   * @param {Pick<PawnTicketType, "id">} id
   * @param {Pick<ItemType, "description" | "appraisedValue" | "pawningAmount"> & {itemDetails?: GoldItemType | VehicleItemType} } item
   * @returns {Promise<(ItemType | void)>}
   */
  addItem: async (id, item, user) => {
    const transaction = await sequelize.transaction();

    try {
      const pawnTicket = await PawnTicket.findByPk(id, {
        transaction,
      });

      if (!pawnTicket) {
        throw new AppError(errorTypes.PAWN_TICKET.NO_TICKET);
      }

      const createdItem = await Item.create(item, {
        include: [
          {
            model: ItemDetails,
            as: 'itemDetails',
          },
        ],
        transaction,
      });

      await pawnTicket.addItem(createdItem, { transaction });

      await createdItem.setLastUpdatedBy(user, { transaction });
      await pawnTicket.setLastUpdatedBy(user, { transaction });

      await transaction.commit();
      await pawnTicket.reload();
      return createdItem;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      logger.error('addItem', error);
      throw error;
    }
  },
  /**
   *
   * @param {Pick<ItemType, "id">} id
   * @param {Pick<ItemType, "description" | "appraisedValue" | "pawningAmount"> & {itemDetails?: GoldItemType | VehicleItemType} } item
   * @returns {Promise<(PawnTicketType | void)>}
   */
  updateItem: async (id, item, user) => {
    const transaction = await sequelize.transaction();

    try {
      const itemToUpdate = await Item.findByPk(id, {
        include: [
          {
            model: ItemDetails,
            as: 'itemDetails',
          },
        ],
        transaction,
      });

      if (!itemToUpdate) {
        throw new AppError(errorTypes.ITEM.NO_ITEM);
      }

      await ItemDetails.destroy({
        where: { itemId: itemToUpdate.id },
        transaction,
      });

      await itemToUpdate.update(
        {
          description: item.description,
          appraisedValue: item.appraisedValue,
          pawningAmount: item.pawningAmount,
        },
        {
          transaction,
        },
      );

      const createdItemDetails = await ItemDetails.bulkCreate(
        item.itemDetails,
        { transaction },
      );
      await itemToUpdate.addItemDetails(createdItemDetails, { transaction });

      await itemToUpdate.setLastUpdatedBy(user, { transaction });

      await transaction.commit();
      await itemToUpdate.reload();
      return itemToUpdate;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      logger.error('updateItem', error);
      throw error;
    }
  },
  /**
   *
   * @param {Pick<ItemType, "id">} id
   * @returns {Promise<void>}
   */
  deleteItem: async (id) => {
    const transaction = await sequelize.transaction();

    try {
      const itemToUpdate = await Item.findByPk(id, {
        include: [
          {
            model: ItemDetails,
            as: 'itemDetails',
          },
        ],
        transaction,
      });

      if (!itemToUpdate) {
        throw new AppError(errorTypes.ITEM.NO_ITEM);
      }

      await ItemDetails.destroy({
        where: { itemId: itemToUpdate.id },
        transaction,
      });

      await Item.destroy({
        where: { id: itemToUpdate.id },
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      logger.error('deleteItem', error);
      throw error;
    }
  },
};
module.exports = ItemService;

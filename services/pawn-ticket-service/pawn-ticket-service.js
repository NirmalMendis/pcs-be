const sequelize = require('../../utils/database');
const { BranchType } = require('../../models/branch');
const { PawnTicketType } = require('../../models/pawn-ticket');
const { ItemType } = require('../../models/item');
const PawnTicket = require('../../models/pawn-ticket');
const Item = require('../../models/item');

/**
 * @namespace
 */
const PawnTicketService = {
  /**
   *
   * @param  {Pick<PawnTicketType, 'customerId' | "pawnDate" | "dueDate" | "principalAmount" | "interestRate" | "status" | "branchId">} pawnTicketData
   * @param {Array<Pick<ItemType, "description" | "caratage" | "appraisedValue" | "pawningAmount" | "weight">>} items
   * @returns {Promise<(BranchType | void)>}
   */
  createPawnTicket: async (pawnTicketData) => {
    const transaction = await sequelize.transaction();
    const {
      pawnDate,
      dueDate,
      principalAmount,
      interestRate,
      status,
      branchId,
      customerId,
      items,
    } = pawnTicketData;

    try {
      const pawnTicket = await PawnTicket.create(
        {
          pawnDate,
          dueDate,
          principalAmount,
          interestRate,
          status,
          items: items,
          branchId,
          customerId,
        },
        {
          include: [Item],
          transaction,
        },
      );

      await transaction.commit();

      return pawnTicket;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
};

module.exports = PawnTicketService;

const sequelize = require('../utils/database');
const { BranchType } = require('../models/branch');
const { PawnTicketType } = require('../models/pawn-ticket');
const { ItemType } = require('../models/item');
const PawnTicket = require('../models/pawn-ticket');
const Item = require('../models/item');

/**
 * @namespace
 */
const PawnTicketService = {
  /**
   *
   * @param  {Pick<PawnTicketType, 'customerId' | "pawnDate" | "dueDate" | "interestRate" | "status" | "branchId"> & { items: Array<Pick<ItemType, "description" | "caratage" | "appraisedValue" | "pawningAmount" | "weight">> }} pawnTicketData
   * @returns {Promise<(BranchType | void)>}
   */
  createPawnTicket: async (pawnTicketData) => {
    const transaction = await sequelize.transaction();
    const {
      pawnDate,
      dueDate,
      interestRate,
      status,
      branchId,
      customerId,
      items,
    } = pawnTicketData;

    try {
      const calculatedPrincipalAmount = items
        ?.map((item) => item.pawningAmount)
        ?.reduce((acc, curr) => acc + curr, 0);
      const pawnTicket = await PawnTicket.create(
        {
          pawnDate,
          dueDate,
          principalAmount: calculatedPrincipalAmount,
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
  /**
   *
   * @param {number} principalAmount
   * @param {number} interestRate
   * @returns {number}
   */
  calculateMonthlyInterest: (principalAmount, interestRate) => {
    return (principalAmount * interestRate) / 100;
  },
};

module.exports = PawnTicketService;

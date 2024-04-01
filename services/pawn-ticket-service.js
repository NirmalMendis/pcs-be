const { sequelize } = require('../utils/database');
const { PawnTicketType } = require('../models/pawn-ticket');
const { ItemType } = require('../models/item');
const { UserType } = require('../models/user');
const PawnTicket = require('../models/pawn-ticket');
const Item = require('../models/item');
const InvoiceService = require('./invoice-service.');
const {
  MATERIAL_CONTENT_TYPES,
} = require('../utils/constants/generic-constantss');
const { addMonths } = require('date-fns');
const { InterestStatusEnum } = require('../utils/constants/db-enums');
const Interest = require('../models/interest');

/**
 * @namespace
 */
const PawnTicketService = {
  /**
   *
   * @param  {Pick<PawnTicketType, 'customerId' | "pawnDate" | "dueDate" | "interestRate" | "status" | "branchId" | "serviceCharge"> & { items: Array<Pick<ItemType, "description" | "caratage" | "appraisedValue" | "pawningAmount" | "weight">> }} pawnTicketData
   * @param {UserType} user
   * @returns {Promise<(PawnTicketType | void)>}
   */
  createPawnTicket: async (pawnTicketData, user) => {
    const transaction = await sequelize.transaction();
    const {
      pawnDate,
      dueDate,
      interestRate,
      status,
      branchId,
      customerId,
      items,
      serviceCharge,
    } = pawnTicketData;

    try {
      const calculatedPrincipalAmount = items
        ?.map((item) => item.pawningAmount)
        ?.reduce((acc, curr) => acc + curr, 0);

      const monthlyInterest = PawnTicketService.calculateMonthlyInterest(
        calculatedPrincipalAmount,
        interestRate,
      );
      let dateInAction = new Date(pawnDate);
      const interests = [];
      while (dateInAction <= new Date(dueDate)) {
        const prevDate = dateInAction;
        dateInAction = addMonths(dateInAction, 1);
        interests.push({
          fromDate: prevDate,
          toDate: dateInAction,
          amount: monthlyInterest,
          status: InterestStatusEnum.UPCOMING,
        });
      }

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
          serviceCharge,
          interests,
        },
        {
          include: [Item, Interest],
          transaction,
        },
      );

      const invoiceHTMLContent = await InvoiceService.generateInvoice(
        {
          customerId,
          items,
          pawnTicket,
        },
        MATERIAL_CONTENT_TYPES.HTML,
        {
          transaction,
        },
      );
      const invoice = await InvoiceService.createInvoice(invoiceHTMLContent, {
        transaction,
      });

      pawnTicket.setInvoice(invoice);

      await pawnTicket.setLastUpdatedBy(user, { transaction });
      await invoice.setLastUpdatedBy(user, { transaction });

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

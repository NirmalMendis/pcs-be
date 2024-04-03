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
const {
  InterestStatusEnum,
  PawnTicketStatusEnum,
} = require('../utils/constants/db-enums');
const Interest = require('../models/interest');
const calculateMonthlyInterestFn = require('../helpers/business-logic/calculate-monthly-interest');
const getFirstInterestDate = require('../helpers/business-logic/get-first-interest-date');
const Invoice = require('../models/invoice');
const AppError = require('../utils/errors/AppError');
const errorTypes = require('../utils/errors/errors');

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
          firstInterestDate: getFirstInterestDate(pawnDate),
          monthlyInterest,
        },
        MATERIAL_CONTENT_TYPES.HTML,
        {
          transaction,
        },
      );
      const invoice = await InvoiceService.createInvoice(invoiceHTMLContent, {
        transaction,
      });

      await pawnTicket.setInvoice(invoice, { transaction });

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
  calculateMonthlyInterest: calculateMonthlyInterestFn,
  /**
   *
   * @param  {Pick<PawnTicketType, 'id'>} id
   * @param {UserType} user
   * @returns {Promise<(PawnTicketType | void)>}
   */
  createRevision: async (id, user) => {
    const transaction = await sequelize.transaction();
    try {
      const originalPawnTicket = await PawnTicket.findByPk(id, {
        where: { previousRevision: null },
        include: [Item, Interest, Invoice],
        transaction,
      });

      if (!originalPawnTicket) {
        throw new AppError(errorTypes.PAWN_TICKET.TICKET_DOES_NOT_EXISTS);
      }
      const isRevised = await PawnTicketService.isTicketRevised(
        originalPawnTicket.id,
        transaction,
      );

      if (isRevised) {
        throw new AppError(errorTypes.PAWN_TICKET.REVISION_EXISTS);
      }

      const clonedItems = originalPawnTicket.items.map((item) => ({
        caratage: item.caratage,
        description: item.description,
        appraisedValue: item.appraisedValue,
        pawningAmount: item.pawningAmount,
        weight: item.weight,
      }));

      const clonedInterests = originalPawnTicket.interests.map((interest) => ({
        fromDate: interest.fromDate,
        toDate: interest.toDate,
        amount: interest.amount,
        status: interest.status,
      }));

      const clonedPawnTicket = await PawnTicket.create(
        {
          previousRevision: originalPawnTicket.id,
          pawnDate: originalPawnTicket.pawnDate,
          dueDate: originalPawnTicket.dueDate,
          principalAmount: originalPawnTicket.principalAmount,
          interestRate: originalPawnTicket.interestRate,
          status: originalPawnTicket.status,
          items: clonedItems,
          branchId: originalPawnTicket.branchId,
          customerId: originalPawnTicket.customerId,
          serviceCharge: originalPawnTicket.serviceCharge,
          interests: clonedInterests,
        },
        {
          include: [Item, Interest],
          transaction,
        },
      );

      const clonedInvoice = await InvoiceService.createInvoice(
        originalPawnTicket.invoice.htmlContent,
        {
          transaction,
        },
      );

      originalPawnTicket.status = PawnTicketStatusEnum.REVISED;

      await clonedPawnTicket.setInvoice(clonedInvoice, { transaction });
      await clonedPawnTicket.setLastUpdatedBy(user, { transaction });
      await clonedInvoice.setLastUpdatedBy(user, { transaction });
      await originalPawnTicket.save({ transaction });

      const clonedPawnTicketDbCopy = await PawnTicket.findByPk(
        clonedPawnTicket.id,
        {
          transaction,
        },
      );

      await transaction.commit();

      return clonedPawnTicketDbCopy;
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  },
  /**
   *
   * @param  {Pick<PawnTicketType, 'id'>} id
   * @returns {Promise<(boolean)>}
   */
  isTicketRevised: async (id, transaction) => {
    const pawnTicket = await PawnTicket.findOne({
      where: { previousRevision: id },
      transaction,
    });

    return !!pawnTicket;
  },
  /**
   *
   * @param  {Pick<PawnTicketType, 'id'>} id
   * @returns {Promise<(boolean)>}
   */
  getRevisionIds: async (id, transaction) => {
    const pawnTicketInQuery = await PawnTicket.findByPk(id, {
      transaction,
    });

    const previousRevisions = [];
    let previousRevision = pawnTicketInQuery.previousRevision;

    do {
      if (previousRevision) {
        previousRevisions.push(previousRevision);
        const previousRevisionTicket = await PawnTicket.findByPk(
          previousRevision,
          {
            attributes: ['id', 'previousRevision'],
            transaction,
          },
        );
        previousRevision = previousRevisionTicket.previousRevision;
      }
    } while (previousRevision);

    const forwardRevisions = [];
    let forwardRevision = await PawnTicket.findOne({
      where: {
        previousRevision: pawnTicketInQuery.id,
      },
      attributes: ['id', 'previousRevision'],
      transaction,
    });

    while (forwardRevision) {
      forwardRevisions.push(forwardRevision.id);
      const forwardRevisionBooking = await PawnTicket.findOne({
        where: {
          previousRevision: forwardRevision.id,
        },
        attributes: ['id', 'previousRevision'],
        transaction,
      });
      forwardRevision = forwardRevisionBooking;
    }

    const allRevisions = [
      ...previousRevisions.reverse(),
      pawnTicketInQuery.id,
      ...forwardRevisions,
    ];

    return allRevisions;
  },
};

module.exports = PawnTicketService;

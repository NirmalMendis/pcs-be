const { SequelizeOptionsType } = require('../utils/types');
const { InvoiceType } = require('../models/invoice');
const Invoice = require('../models/invoice');
const {
  TicketInvoiceTemplateType,
} = require('../utils/pdf-templates/ticket-invoice');
const ticketInvoiceTemplate = require('../utils/pdf-templates/ticket-invoice');
const {
  MATERIAL_CONTENT_TYPES,
} = require('../utils/constants/generic-constantss');
const PdfService = require('./pdf-service');
const BranchService = require('./branch-service');
const CustomerService = require('./customer-service');
const sequelize = require('../utils/database');

/**
 * @namespace
 */
const InvoiceService = {
  /**
   *
   * @param  {SequelizeOptionsType} options
   * @returns {Promise<(InvoiceType | void)>}
   */
  findInvoice: async (...options) => {
    try {
      /**
       * @type {InvoiceType}
       */
      const invoice = await Invoice.findOne(...options);
      return invoice;
    } catch (error) {
      if (options.transaction) {
        await options.transaction.rollback();
      }
      throw error;
    }
  },
  /**
   *
   * @param  {string} htmlContent
   * @param  {SequelizeOptionsType} options
   * @returns {Promise<(InvoiceType | void)>}
   */
  createInvoice: async (htmlContent, ...options) => {
    try {
      if (!options.transaction) {
        options.transaction = await sequelize.transaction();
      }
      /**
       * @type {InvoiceType}
       */
      const invoice = await Invoice.create(
        {
          htmlContent,
        },
        {
          transaction: options.transaction,
        },
      );
      await options.transaction.commit();

      return invoice;
    } catch (error) {
      if (options.transaction) {
        await options.transaction.rollback();
      }
      throw error;
    }
  },
  /**
   *
   * @param  {Pick<TicketInvoiceTemplateType, | 'firstInterestDate' | 'items' | 'monthlyInterest' | 'pawnTicket'> & { customerId: string }} invoiceTemplateData
   * @param  {string} materialContentType
   * @param  {SequelizeOptionsType} options
   * @returns {Promise<(string)>}
   */
  generateInvoice: async (
    invoiceTemplateData,
    materialContentType,
    ...options
  ) => {
    try {
      const mainBranchProfile = await BranchService.findBranch({
        where: { isMainBranch: true },
        attributes: [
          'addressLine1',
          'addressLine2',
          'addressLine3',
          'city',
          'postalCode',
          'title',
        ],
      });
      const { title: branchName, ...branchAddress } = mainBranchProfile.get({
        dataValues: true,
      });
      const customer = await CustomerService.findCustomer({
        where: { id: invoiceTemplateData.customerId },
        attributes: [
          'addressLine1',
          'addressLine2',
          'addressLine3',
          'city',
          'postalCode',
          'firstName',
          'lastName',
          'mobileNo',
          'nicNo',
        ],
      });
      /**
       * @type {TicketInvoiceTemplateType}
       */
      const completeInvoiceTemplateData = {
        company: {
          address: branchAddress,
          name: branchName,
        },
        customer: customer,
        ...invoiceTemplateData,
      };

      /**
       * @type {InvoiceType}
       */
      const invoiceHTML = ticketInvoiceTemplate(completeInvoiceTemplateData);
      if (materialContentType == MATERIAL_CONTENT_TYPES.HTML) {
        return invoiceHTML;
      }
      if (materialContentType == MATERIAL_CONTENT_TYPES.PDF) {
        const invoicePdf = await PdfService.generatePdf(invoiceHTML);
        return invoicePdf;
      }
    } catch (error) {
      if (options.transaction) {
        await options.transaction.rollback();
      }
      throw error;
    }
  },
};

module.exports = InvoiceService;

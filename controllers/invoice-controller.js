const calculateMonthlyInterestFn = require('../helpers/business-logic/calculate-monthly-interest');
const getFirstInterestDate = require('../helpers/business-logic/get-first-interest-date');
const sendSuccessResponse = require('../helpers/shared/success-response');
const InvoiceService = require('../services/invoice-service.');
const PdfService = require('../services/pdf-service');
const catchAsync = require('../utils/catchAsync');
const {
  MATERIAL_CONTENT_TYPES,
} = require('../utils/constants/generic-constantss');

/**
 * @namespace
 */
const InvoiceController = {
  // eslint-disable-next-line no-unused-vars
  getInvoice: catchAsync(async (req, res, next) => {
    const invoice = await InvoiceService.findInvoice({
      where: {
        id: req.params.id,
      },
    });
    const invoiceHTML = invoice.htmlContent.toString('utf8');
    if (req.query.materialContentType == MATERIAL_CONTENT_TYPES.HTML)
      sendSuccessResponse(res, { invoiceHTML });
    else if (req.query.materialContentType == MATERIAL_CONTENT_TYPES.PDF) {
      const invoicePdf = await PdfService.generatePdf(invoiceHTML);
      res.contentType('application/pdf');
      res.send(invoicePdf);
    }
  }),
  // eslint-disable-next-line no-unused-vars
  getDraftInvoice: catchAsync(async (req, res, next) => {
    const firstInterestDate = getFirstInterestDate(
      req.body.pawnTicket.pawnDate,
    );
    const monthlyInterest = calculateMonthlyInterestFn(
      req.body.pawnTicket.principalAmount,
      req.body.pawnTicket.interestRate,
    );

    const draftInvoice = await InvoiceService.generateInvoice(
      {
        ...req.body,
        firstInterestDate,
        monthlyInterest,
      },
      MATERIAL_CONTENT_TYPES.PDF,
    );
    res.contentType('application/pdf');
    res.send(draftInvoice);
  }),
};

module.exports = InvoiceController;

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
  getInvoice: catchAsync(async (req, res) => {
    const draftInvoice = await InvoiceService.findInvoice({
      id: req.id,
    });
    const invoiceHTML = draftInvoice.htmlContent.toString('utf8');
    if (req.query.materialContentType == MATERIAL_CONTENT_TYPES.HTML)
      sendSuccessResponse(res, { invoiceHTML });
    else if (req.query.materialContentType == MATERIAL_CONTENT_TYPES.PDF) {
      const invoicePdf = await PdfService.generatePdf(invoiceHTML);
      res.contentType('application/pdf');
      res.send(invoicePdf);
    }
  }),
  getDraftInvoice: catchAsync(async (req, res) => {
    const draftInvoice = await InvoiceService.generateInvoice(
      req.body,
      MATERIAL_CONTENT_TYPES.PDF,
    );
    res.contentType('application/pdf');
    res.send(draftInvoice);
  }),
};

module.exports = InvoiceController;

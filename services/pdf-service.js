const { default: puppeteer } = require('puppeteer');
const MetadataService = require('./metadata-service');
const { SettingEnum } = require('../utils/constants/db-enums');

/**
 * @namespace
 */
const PdfService = {
  /**
   *
   * @param  {string} html
   * @returns {Promise<Buffer>}
   */
  generatePdf: async (html) => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    const margin = await MetadataService.findSetting(
      SettingEnum.INVOICE_PDF_MARGIN,
    );
    const pageSize = await MetadataService.findSetting(
      SettingEnum.INVOICE_PDF_SIZE,
    );

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');
    await page.addStyleTag({
      content: `
                @page {
                  margin: ${margin.value};
                }
                body {
                  margin: 0;
                }
              `,
    });
    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      format: pageSize.value,
    });
    await browser.close();

    return pdf;
  },
};

module.exports = PdfService;

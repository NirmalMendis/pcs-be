const { default: puppeteer } = require('puppeteer');

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
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');
    const pdf = await page.pdf({
      printBackground: true,
      format: 'A4',
    });
    await browser.close();

    return pdf;
  },
};

module.exports = PdfService;

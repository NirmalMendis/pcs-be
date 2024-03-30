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
      //provide same margin to FE browser print
      margin: { bottom: '15px', top: '15px', left: '15px', right: '15px' },
      printBackground: true,
      //set same page size in FE browser print
      format: 'A4',
    });
    await browser.close();

    return pdf;
  },
};

module.exports = PdfService;

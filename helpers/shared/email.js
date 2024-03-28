const nodemailer = require('nodemailer');
const BranchService = require('../../services/branch-service');
const { Transaction } = require('sequelize');

const createTransport = () => {
  if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line no-console
    console.log('---------- Email Prod Transport Created -------------');
    // Sendgrid
    return nodemailer.createTransport({
      host: process.env.PROD_EMAIL_HOST,
      port: process.env.PROD_EMAIL_PORT,
      auth: {
        user: process.env.PROD_EMAIL_USERNAME,
        pass: process.env.PROD_EMAIL_PASSWORD,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * @typedef {Object} SendEmailOptionsType
 * @property {Transaction} transaction
 * @property {string} email
 * @property {string} subject
 * @property {string} html
 */

/**
 *
 * @param {SendEmailOptionsType} options
 */
const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = createTransport();

  // 2) Define the email options
  const mainBranchProfile = await BranchService.findBranch(
    { where: { isMainBranch: true } },
    {
      transaction: options.transaction,
    },
  );

  const mailOptions = {
    from: `"${mainBranchProfile.title}" <${mainBranchProfile.email}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

const nodemailer = require('nodemailer');
const { Transaction } = require('sequelize');
const logger = require('../../utils/logger');
const {
  SOFTTANK_ADMIN_USER_EMAIL,
} = require('../../utils/constants/generic-constantss');

const createTransport = () => {
  logger.info(
    `--------transport initiated------${process.env.NODE_ENV}-------`,
  );
  if (process.env.NODE_ENV === 'production') {
    logger.info('---------- Email Prod Transport Created -------------');
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
  logger.info('--------transport create-------------');
  const mailOptions = {
    from: `Assetank <${SOFTTANK_ADMIN_USER_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  logger.info('--------mailOptions-------------', mailOptions);
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

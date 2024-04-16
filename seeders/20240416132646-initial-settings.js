'use strict';
const { SettingEnum } = require('../utils/constants/db-enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('settings', [
      {
        description: 'invoice pdf margin',
        settingType: SettingEnum.INVOICE_PDF_MARGIN,
        value: '15px',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'invoice pdf page size',
        settingType: SettingEnum.INVOICE_PDF_SIZE,
        value: 'A4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'Company Name',
        settingType: SettingEnum.COMPANY_NAME,
        value: 'S.A.S Fernando',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings', {
      settingType: {
        [Sequelize.Op.or]: [
          SettingEnum.INVOICE_PDF_MARGIN,
          SettingEnum.INVOICE_PDF_SIZE,
          SettingEnum.COMPANY_NAME,
        ],
      },
    });
  },
};

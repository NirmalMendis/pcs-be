'use strict';

const { SettingEnum } = require('../utils/constants/db-enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('settings', [
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
        [Sequelize.Op.or]: [SettingEnum.COMPANY_NAME],
      },
    });
  },
};

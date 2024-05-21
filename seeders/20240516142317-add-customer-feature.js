'use strict';

const { FeatureEnum } = require('../utils/constants/db-enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('features', [
      {
        description: 'Customer handling',
        featureType: FeatureEnum.CUSTOMER,
        value: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('features', {
      settingType: {
        [Sequelize.Op.or]: [FeatureEnum.CUSTOMER],
      },
    });
  },
};

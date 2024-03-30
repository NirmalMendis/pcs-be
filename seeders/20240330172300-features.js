'use strict';

const { FeatureEnum } = require('../utils/constants/db-enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('features', [
      {
        description: 'pawn ticket related features',
        featureType: FeatureEnum.PAWN_TICKET,
        value: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        description: 'branch related features',
        featureType: FeatureEnum.BRANCH,
        value: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('features', {
      settingType: {
        [Sequelize.Op.or]: [FeatureEnum.PAWN_TICKET, FeatureEnum.BRANCH],
      },
    });
  },
};

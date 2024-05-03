'use strict';

const { ItemTypes } = require('../utils/constants/db-enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('items', 'itemType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ItemTypes.GOLD,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('items', 'itemType');
  },
};

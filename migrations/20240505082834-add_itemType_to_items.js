'use strict';

const { ItemTypes } = require('../utils/constants/db-enums');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add itemType column to items table
    await queryInterface.addColumn('items', 'itemType', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ItemTypes.GOLD, // Set default value for existing rows
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('items', 'itemType');
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'item_details', // name of the table to add the column to
      'itemId', // name of the new column
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'items', // name of the table the column references
          key: 'id', // column in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('item_details', 'itemId');
  },
};

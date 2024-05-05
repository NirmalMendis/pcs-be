'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pawn_tickets', 'branchId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'branches', // name of the table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('pawn_tickets', 'branchId');
  },
};

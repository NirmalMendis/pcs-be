'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('pawn_tickets', 'invoiceId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'invoices',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('pawn_tickets', 'invoiceId');
  },
};

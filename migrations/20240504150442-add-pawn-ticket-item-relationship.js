'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('items', 'pawnTicketId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'pawn_tickets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('items', 'pawnTicketId');
  },
};

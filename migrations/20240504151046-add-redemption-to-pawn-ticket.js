'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('redemptions', 'pawnTicketId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'pawn_tickets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('redemptions', 'pawnTicketId');
  },
};

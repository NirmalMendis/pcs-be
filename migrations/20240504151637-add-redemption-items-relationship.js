'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('items', 'redemptionId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'redemptions',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('items', 'redemptionId');
  },
};

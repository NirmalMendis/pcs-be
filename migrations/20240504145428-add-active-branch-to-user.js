'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'activeBranchId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'branches', // This is the table name of the target model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'activeBranchId');
  },
};

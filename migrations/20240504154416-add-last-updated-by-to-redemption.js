'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('redemptions', 'lastUpdatedById', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', // This is the table name of the User model
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('redemptions', 'lastUpdatedById');
  },
};

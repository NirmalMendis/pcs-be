'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'email', {
      type: Sequelize.STRING,
      allowNull: true, // Make the email field optional
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('customers', 'email', {
      type: Sequelize.STRING,
      allowNull: false, // Revert the email field to be required
    });
  },
};

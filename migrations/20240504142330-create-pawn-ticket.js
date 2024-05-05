'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pawn_tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      revision: {
        type: Sequelize.INTEGER,
      },
      pawnDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      periodInMonths: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dueDate: {
        type: Sequelize.DATE,
      },
      principalAmount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      serviceCharge: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      interestRate: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('pawn_tickets');
  },
};

'use strict';

const {
  FunctionEnum,
  CategoryEnum,
} = require('../utils/constants/generic-constantss');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('functions', [
      //Pawn Ticket
      {
        title: FunctionEnum.PAWN_TICKET,
        category: CategoryEnum.PAWN_TICKET,
        view: true,
        create: true,
        update: true,
        delete: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //Customer
      {
        title: FunctionEnum.CUSTOMER,
        category: CategoryEnum.CUSTOMER,
        view: true,
        create: true,
        update: true,
        delete: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('functions', null, {});
  },
};

'use strict';

const { FunctionEnum } = require('../utils/constants/generic-constantss');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('functions', [
      //Pawn Ticket
      {
        title: FunctionEnum.PAWN_TICKET,
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
        view: true,
        create: true,
        update: true,
        delete: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      //IAM
      {
        title: FunctionEnum.IAM,
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

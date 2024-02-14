'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [
      {
        firstName: 'Test Test',
        lastName: 'last',
        email: 'test@test.com',
        passkey: await bcrypt.hash('test@test.com' + '123', 12),
        branchId: 1,
        mobileNo: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Peter',
        lastName: 'Max',
        email: 'petermax@test.com',
        passkey: await bcrypt.hash('petermax@test.com' + '123', 12),
        branchId: 1,
        mobileNo: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      [Sequelize.Op.or]: [
        { email: 'test@test.com' },
        { email: 'petermax@test.com' },
      ],
    });
  },
};

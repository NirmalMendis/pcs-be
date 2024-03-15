'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const branches = await queryInterface.sequelize.query(
      'SELECT id from branches',
    );

    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Test Test',
        lastName: 'last',
        email: 'test@test.com',
        passkey: await bcrypt.hash('test@test.com' + '123', 12),
        activeBranchId: branches[0][0].id,
        mobileNo: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Peter',
        lastName: 'Max',
        email: 'petermax@test.com',
        passkey: await bcrypt.hash('petermax@test.com' + '123', 12),
        activeBranchId: branches[0][0].id,
        mobileNo: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const users = await queryInterface.sequelize.query('SELECT id from users');

    await queryInterface.bulkInsert('userconnectbranches', [
      {
        userId: users[0][0].id,
        branchId: branches[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][0].id,
        branchId: branches[0][1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[0][1].id,
        branchId: branches[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('userconnectbranches', null, {});
    await queryInterface.bulkDelete('users', {
      [Sequelize.Op.or]: [
        { email: 'test@test.com' },
        { email: 'petermax@test.com' },
      ],
    });
  },
};

'use strict';
const bcrypt = require('bcrypt');
const {
  SUPER_ADMIN_ROLE,
  SOFTTANK_ADMIN_USER_EMAIL,
} = require('../utils/constants/generic-constantss');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const branches = await queryInterface.sequelize.query(
      'SELECT id from branches',
    );

    await queryInterface.bulkInsert('users', [
      {
        firstName: 'Soft',
        lastName: 'Tank',
        email: SOFTTANK_ADMIN_USER_EMAIL,
        passkey: await bcrypt.hash(SOFTTANK_ADMIN_USER_EMAIL + 'User@123', 12),
        activeBranchId: branches[0][0].id,
        mobileNo: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const superAdminUser = await queryInterface.sequelize.query(
      `SELECT id from users where email="${SOFTTANK_ADMIN_USER_EMAIL}"`,
    );

    const roles = await queryInterface.sequelize.query(
      `SELECT id from roles where status="Active" and title="${SUPER_ADMIN_ROLE}"`,
    );

    await queryInterface.bulkInsert('user_connect_roles', [
      {
        userId: superAdminUser[0][0].id,
        roleId: roles[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('user_connect_branches', [
      {
        userId: superAdminUser[0][0].id,
        branchId: branches[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    return;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_connect_branches', null, {});
    await queryInterface.bulkDelete('users', {
      [Sequelize.Op.or]: [{ email: SOFTTANK_ADMIN_USER_EMAIL }],
    });
  },
};

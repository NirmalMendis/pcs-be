'use strict';
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const {
  SOFTTANK_ADMIN_USER_EMAIL,
  SUPER_ADMIN_ROLE,
} = require('../utils/constants/generic-constantss');
const bcrypt = require('bcrypt');

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
        passkey: await bcrypt.hash(
          SOFTTANK_ADMIN_USER_EMAIL + process.env.SOFTTANK_ADMIN_USER_PASSWORD,
          12,
        ),
        activeBranchId: branches[0][0].id,
        mobileNo: '0772311464',
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

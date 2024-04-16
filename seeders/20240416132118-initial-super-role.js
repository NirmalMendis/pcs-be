'use strict';

const { SUPER_ADMIN_ROLE } = require('../utils/constants/generic-constantss');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('roles', [
      {
        title: SUPER_ADMIN_ROLE,
        status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const superAdminRole = await queryInterface.sequelize.query(
      `SELECT id from roles where title ='${SUPER_ADMIN_ROLE}'`,
    );

    const functions = await queryInterface.sequelize.query(
      'SELECT id from functions',
    );

    await queryInterface.bulkInsert('role_connect_functions', [
      ...functions[0].map((funct) => ({
        action: 'view',
        functionId: funct.id,
        roleId: superAdminRole[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      ...functions[0].map((funct) => ({
        action: 'create',
        functionId: funct.id,
        roleId: superAdminRole[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      ...functions[0].map((funct) => ({
        action: 'update',
        functionId: funct.id,
        roleId: superAdminRole[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      ...functions[0].map((funct) => ({
        action: 'delete',
        functionId: funct.id,
        roleId: superAdminRole[0][0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('role_connect_functions', null, {});
    return queryInterface.bulkDelete('roles', null, {});
  },
};

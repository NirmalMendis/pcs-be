'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('branches', [
      {
        title: 'Ja-Ela',
        email: null,
        addressLine1: '532/1',
        addressLine2: 'Kapuwatta',
        addressLine3: '',
        city: 'Ja-Ela',
        postalCode: '11350',
        mobileNo: '0701854328',
        isMainBranch: true,
        logoURL: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('branches', null, {});
  },
};

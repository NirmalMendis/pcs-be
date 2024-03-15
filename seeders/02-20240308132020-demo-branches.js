'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('branches', [
      {
        name: 'Colombo',
        email: 'test@gmailt2est.com',
        addressLine1: 'Test (Pvt) Ltd',
        addressLine2: 'TESTA, Galle Face Terrace,',
        addressLine3: 'Colombo 03, Sri Lanka.',
        city: 'Colombo',
        postalCode: '12211',
        mobileNo: '+94 193456238',
        isMainBranch: false,
        logoURL:
          'http://www.ceylonwildsafaris.com/wp-content/uploads/2019/04/cws-logo_small.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down() {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('branches', [
      {
        name: 'Ragama',
        email: 'nirmal.gmw@gmail.com',
        addressLine1: 'Test (Pvt) Ltd',
        addressLine2: 'TESTA, Galle Face Terrace,',
        addressLine3: 'Colombo 03, Sri Lanka.',
        city: 'Ragama',
        postalCode: '12211',
        mobileNo: '+94 123456678',
        isMainBranch: true,
        logoURL:
          'http://www.ceylonwildsafaris.com/wp-content/uploads/2019/04/cws-logo_small.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('branches', null, {});
  },
};

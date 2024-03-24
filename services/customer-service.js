const { SequelizeOptionsType } = require('../utils/types');
const { CustomerType } = require('../models/customer');
const Customer = require('../models/customer');

const CustomerService = {
  /**
   *
   * @param  {SequelizeOptionsType} options
   * @returns {Promise<(CustomerType | void)>}
   */
  findCustomer: async (...options) => {
    try {
      /**
       * @type {CustomerType}
       */
      const customer = await Customer.findOne(...options);
      return customer;
    } catch (error) {
      if (options.transaction) {
        await options.transaction.rollback();
      }
      throw error;
    }
  },
};

/**
 * @namespace
 */
module.exports = CustomerService;

const Customer = require('../models/customer');
const DbFactoryService = require('../services/db-factory-service/db-factory-service');

/**
 * @namespace
 */
const CustomerController = {
  getCustomer: DbFactoryService.getOne(Customer),
};

module.exports = CustomerController;

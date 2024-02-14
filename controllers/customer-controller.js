const Customer = require('../models/customer');
const DbFactoryService = require('../services/db-factory-service/db-factory-service');

/**
 * @namespace
 */
const CustomerController = {
  getCustomer: DbFactoryService.getOne(Customer),
  createCustomer: DbFactoryService.createOne(Customer),
  searchCustomers: DbFactoryService.getAllBySearch(Customer),
};

module.exports = CustomerController;

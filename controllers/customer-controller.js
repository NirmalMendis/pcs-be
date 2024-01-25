const CustomerService = require("../services/customer-service/customer-service");

const CustomerController = {
  getCustomer: CustomerService.getCustomer,
};

module.exports = CustomerController;

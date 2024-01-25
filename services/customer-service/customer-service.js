const { getOne } = require("../../controllers/db-factory/handleFactory");
const Customer = require("../../models/customer");

const CustomerService = {
  getCustomer: getOne(Customer),
};

module.exports = CustomerService;

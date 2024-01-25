const createError = require('http-errors');
const CustomerService = require('../services/customer.service');

const CustomerController = {
  getAllCustomers: async (req, res, next) => {
    try {
      const customers = await CustomerService.findAll();
      res.json(customers);
    } catch (error) {
      next(createError(500, 'Error fetching customers'));
    }
  },

  getCustomerById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await CustomerService.findOne(id);
      if (!customer) {
        return next(createError(404, 'Customer not found'));
      }
      res.json(customer);
    } catch (error) {
      next(createError(500, `Error fetching customer with ID ${req.params.id}`));
    }
  },

  createCustomer: async (req, res, next) => {
    try {
      const newCustomer = await CustomerService.create(req.body);
      res.status(201).json(newCustomer);
    } catch (error) {
      next(createError(400, 'Error creating customer'));
    }
  },

  updateCustomer: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedCustomer = await CustomerService.update(id, req.body);
      res.json(updatedCustomer);
    } catch (error) {
      next(createError(500, `Error updating customer with ID ${req.params.id}`));
    }
  },

  deleteCustomer: async (req, res, next) => {
    try {
      const { id } = req.params;
      await CustomerService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(createError(500, `Error deleting customer with ID ${req.params.id}`));
    }
  }
};

module.exports = { CustomerController };

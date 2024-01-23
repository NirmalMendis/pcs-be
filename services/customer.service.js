// Import the Sequelize model
const Customer = require('../models/customer');

class CustomerService {
  
  // Create a new customer
  async create(customerData) {
    try {
      const customer = await Customer.create(customerData);
      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Unable to create customer');
    }
  }

  // Retrieve all customers
  async findAll() {
    try {
      return await Customer.findAll();
    } catch (error) {
      console.error('Error finding customers:', error);
      throw new Error('Unable to find customers');
    }
  }

  // Retrieve a single customer by ID
  async findOne(id) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return customer;
    } catch (error) {
      console.error(`Error finding customer with ID ${id}:`, error);
      throw error;
    }
  }

  // Update a customer by ID
  async update(id, updateData) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        throw new Error('Customer not found');
      }
      return await customer.update(updateData);
    } catch (error) {
      console.error(`Error updating customer with ID ${id}:`, error);
      throw new Error('Unable to update customer');
    }
  }

  // Delete a customer by ID
  async delete(id) {
    try {
      const customer = await Customer.findByPk(id);
      if (!customer) {
        throw new Error('Customer not found');
      }
      await customer.destroy();
      return { message: 'Customer deleted successfully' };
    } catch (error) {
      console.error(`Error deleting customer with ID ${id}:`, error);
      throw new Error('Unable to delete customer');
    }
  }
}

module.exports = new CustomerService();

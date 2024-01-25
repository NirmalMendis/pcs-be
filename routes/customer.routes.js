const express = require("express");
const { CustomerController } = require("../controllers/customer.controller");
const router = express.Router();

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Retrieve a list of customers
 *     responses:
 *       200:
 *         description: A list of customers
 */
router.get("/customers", CustomerController.getAllCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Retrieve a single customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single customer
 *       404:
 *         description: Customer not found
 */
router.get("/customers/:id", CustomerController.getCustomerById);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               nic_no:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_no:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - nic_no
 *               - first_name
 *               - last_name
 *               - email
 *               - mobile_no
 *     responses:
 *       201:
 *         description: Customer created
 */
router.post("/customers", CustomerController.createCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nic_no:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               mobile_no:
 *                 type: string
 *               address:
 *                 type: string
 *             required:
 *               - nic_no
 *               - first_name
 *               - last_name
 *               - email
 *               - mobile_no
 *     responses:
 *       200:
 *         description: Customer updated
 */
router.put("/customers/:id", CustomerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Customer deleted
 */
router.delete("/customers/:id", CustomerController.deleteCustomer);

module.exports = router;

const express = require('express');
const CustomerController = require('../controllers/customer-controller');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/search').get(CustomerController.searchCustomers);
router.route('/:id').get(CustomerController.getCustomer);
router.route('/').post(CustomerController.createCustomer);

module.exports = router;

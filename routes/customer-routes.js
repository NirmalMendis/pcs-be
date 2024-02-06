const express = require('express');
const CustomerController = require('../controllers/customer-controller');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/:id').get(CustomerController.getCustomer);

module.exports = router;

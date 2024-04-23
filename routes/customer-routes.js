const express = require('express');
const CustomerController = require('../controllers/customer-controller');
const AuthController = require('../controllers/auth-controller');
const { FunctionEnum } = require('../utils/constants/generic-constantss');
const { PermissionActionEnum } = require('../utils/constants/db-enums');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/search')
  .get(
    AuthController.authorize(FunctionEnum.CUSTOMER, PermissionActionEnum.VIEW),
    CustomerController.searchCustomers,
  );
router
  .route('/:id')
  .get(
    AuthController.authorize(FunctionEnum.CUSTOMER, PermissionActionEnum.VIEW),
    CustomerController.getCustomer,
  );
router
  .route('/')
  .post(
    AuthController.authorize(
      FunctionEnum.CUSTOMER,
      PermissionActionEnum.CREATE,
    ),
    CustomerController.createCustomer,
  );

module.exports = router;

const express = require('express');
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/auth-controller');
const { FunctionEnum } = require('../utils/constants/generic-constantss');
const { PermissionActionEnum } = require('../utils/constants/db-enums');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(
    AuthController.authorize(FunctionEnum.IAM, PermissionActionEnum.CREATE),
    UserController.createUser,
  )
  .get(UserController.getAllUser);
router.route('/permissions').get(UserController.getUserPermissions);
router.route('/:id').get(UserController.getUser);
router.route('/active-branch').patch(UserController.updateActiveBranch);

module.exports = router;

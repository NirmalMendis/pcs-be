const express = require('express');
const AuthController = require('../controllers/auth-controller');
const RoleController = require('../controllers/role-controller');
const { FunctionEnum } = require('../utils/constants/generic-constantss');
const { PermissionActionEnum } = require('../utils/constants/db-enums');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(
    AuthController.authorize(FunctionEnum.IAM, PermissionActionEnum.CREATE),
    RoleController.createRole,
  )
  .get(RoleController.getRoles);
router
  .route('/:id')
  .get(RoleController.getRole)
  .delete(
    AuthController.authorize(FunctionEnum.IAM, PermissionActionEnum.DELETE),
    RoleController.deleteRole,
  )
  .patch(
    AuthController.authorize(FunctionEnum.IAM, PermissionActionEnum.UPDATE),
    RoleController.updateRole,
  );

module.exports = router;

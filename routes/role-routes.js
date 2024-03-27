const express = require('express');
const AuthController = require('../controllers/auth-controller');
const RoleController = require('../controllers/role-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').post(RoleController.createRole).get(RoleController.getRoles);
router
  .route('/:id')
  .get(RoleController.getRole)
  .delete(RoleController.deleteRole)
  .patch(RoleController.updateRole);

module.exports = router;

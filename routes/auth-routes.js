const express = require('express');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.route('/login').post(AuthController.login);
router.route('/set-new-password').patch(AuthController.setNewUserPassword);
router.route('/refresh').get(AuthController.refresh);

router.use(AuthController.protect);

router.route('/logout').post(AuthController.logout);

module.exports = router;

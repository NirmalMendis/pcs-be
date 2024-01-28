const express = require('express');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.route('/login').post(AuthController.login);
router.route('/set-new-password').patch(AuthController.setNewUserPassword);

module.exports = router;

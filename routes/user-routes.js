const express = require('express');
const UserController = require('../controllers/user-controller');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').post(UserController.createUser);

module.exports = router;

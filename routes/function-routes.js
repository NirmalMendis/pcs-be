const express = require('express');
const AuthController = require('../controllers/auth-controller');
const FunctionController = require('../controllers/function-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').get(FunctionController.getFunctions);

module.exports = router;

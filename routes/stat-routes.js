const express = require('express');

const AuthController = require('../controllers/auth-controller');
const StatController = require('../controllers/stat-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/ticket-status').get(StatController.getTicketStatusStats);

module.exports = router;

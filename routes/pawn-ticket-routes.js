const express = require('express');
const PawnRickeController = require('../controllers/pawn-ticket-controller');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').post(PawnRickeController.createPawnTicket);

module.exports = router;

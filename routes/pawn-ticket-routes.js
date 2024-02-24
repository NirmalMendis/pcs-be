const express = require('express');
const PawnRickeController = require('../controllers/pawn-ticket-controller');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(PawnRickeController.createPawnTicket)
  .get(PawnRickeController.getAllPawnTickets);

router
  .route('/calculate-monthly-interest')
  .get(PawnRickeController.getMonthlyInterestValue);
router.route('/:id').get(PawnRickeController.getTicketById);

module.exports = router;

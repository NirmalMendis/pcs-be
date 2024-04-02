const express = require('express');
const PawnRickeController = require('../controllers/pawn-ticket-controller');
const AuthController = require('../controllers/auth-controller');
const validate = require('../utils/validate');
const createPawnTicketSchema = require('../validators/auth/create-pawn-ticket-schema');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(validate(createPawnTicketSchema), PawnRickeController.createPawnTicket)
  .get(PawnRickeController.getAllPawnTickets);

router
  .route('/calculate-monthly-interest')
  .get(PawnRickeController.getMonthlyInterestValue);

router
  .route('/revision/:id')
  .post(PawnRickeController.createPawnTicketRevision);

router.route('/:id').get(PawnRickeController.getTicketById);

module.exports = router;

const express = require('express');
const PawnRickeController = require('../controllers/pawn-ticket-controller');
const AuthController = require('../controllers/auth-controller');
const validate = require('../utils/validate');
const createPawnTicketSchema = require('../validators/auth/create-pawn-ticket-schema');
const { FunctionEnum } = require('../utils/constants/generic-constantss');
const { PermissionActionEnum } = require('../utils/constants/db-enums');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/')
  .post(
    AuthController.authorize(
      FunctionEnum.PAWN_TICKET,
      PermissionActionEnum.CREATE,
    ),
    validate(createPawnTicketSchema),
    PawnRickeController.createPawnTicket,
  )
  .get(
    AuthController.authorize(
      FunctionEnum.PAWN_TICKET,
      PermissionActionEnum.VIEW,
    ),
    PawnRickeController.getAllPawnTickets,
  );

router
  .route('/calculate-monthly-interest')
  .get(PawnRickeController.getMonthlyInterestValue);

router
  .route('/revision/:id')
  .get(
    AuthController.authorize(
      FunctionEnum.PAWN_TICKET,
      PermissionActionEnum.VIEW,
    ),
    PawnRickeController.getRevisionIds,
  )
  .post(
    AuthController.authorize(
      FunctionEnum.PAWN_TICKET,
      PermissionActionEnum.CREATE,
    ),
    PawnRickeController.createPawnTicketRevision,
  );

router.route('/:id').get(PawnRickeController.getTicketById);
router.route('/:id/invoice').patch(PawnRickeController.updateTicketInvoice);

module.exports = router;

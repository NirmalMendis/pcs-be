const express = require('express');
const AuthController = require('../controllers/auth-controller');
const InterestController = require('../controllers/interest-controller');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/pawn-ticket/:id')
  .get(InterestController.getInterestsForPawnTicket);

module.exports = router;

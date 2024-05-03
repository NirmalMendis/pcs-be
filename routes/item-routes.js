const express = require('express');
const AuthController = require('../controllers/auth-controller');
const ItemController = require('../controllers/item-controller');

const router = express.Router();

router.use(AuthController.protect);

router
  .route('/pawn-ticket/:id')
  .get(ItemController.getItemsForPawnTicket)
  .post(ItemController.addItem);

router
  .route('/:id')
  .patch(ItemController.updateItem)
  .delete(ItemController.deleteItem);

module.exports = router;

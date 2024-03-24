const express = require('express');

const AuthController = require('../controllers/auth-controller');
const InvoiceController = require('../controllers/invoice-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/draft').post(InvoiceController.getDraftInvoice);
router.route('/:id').get(InvoiceController.getInvoice);

module.exports = router;

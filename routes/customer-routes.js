const express = require("express");
const CustomerController = require("../controllers/customer-controller");

const router = express.Router();

router.route("/:id").get(CustomerController.getCustomer);

module.exports = router;

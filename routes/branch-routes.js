const express = require('express');
const BranchController = require('../controllers/branch-controller');
const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/').get(BranchController.getAllBranches);

module.exports = router;

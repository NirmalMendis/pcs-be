const express = require('express');
const MetadataController = require('../controllers/metadata-controller');

const AuthController = require('../controllers/auth-controller');

const router = express.Router();

router.use(AuthController.protect);

router.route('/:type').get(MetadataController.getMetaData);

module.exports = router;

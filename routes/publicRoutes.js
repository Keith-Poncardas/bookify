const express = require('express');
const { retrieveBooks, retrieveBook } = require('../controller/public');
const { catchAsync } = require('../utils/errorHandler');
const router = express.Router();

router.get('/', catchAsync(retrieveBooks));
router.get('/:id/view', catchAsync(retrieveBook));

module.exports = router;
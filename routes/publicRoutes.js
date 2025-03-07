const express = require('express');
const { retrieveBooks, retrieveBook } = require('../controller/public');
const router = express.Router();

router.get('/', retrieveBooks);
router.get('/:id/view', retrieveBook);

module.exports = router;
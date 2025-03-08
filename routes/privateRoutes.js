const express = require('express');
const { retrieveHomeDashboard, logout, uploadNewBook } = require('../controller/private');
const router = express.Router();

router.get('/', retrieveHomeDashboard);
router.get('/logout', logout);

router.post('/upload', uploadNewBook);

module.exports = router;
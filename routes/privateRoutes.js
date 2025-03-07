const express = require('express');
const { retrieveHomeDashboard, logout } = require('../controller/private');
const router = express.Router();

router.get('/', retrieveHomeDashboard);
router.get('/logout', logout);

module.exports = router;
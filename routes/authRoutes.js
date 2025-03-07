const express = require('express');
const { getLogin, login } = require('../controller/auth');
const router = express.Router();

router.get('/login', getLogin);
router.post('/login', login);

module.exports = router;
const express = require('express');
const { retrieveHomeDashboard, logout, retrieveUploadForm, uploadNewBook, retrieveEditForm, updateBook, removeBook } = require('../controller/private');
const router = express.Router();

router.get('/', retrieveHomeDashboard);
router.get('/upload', retrieveUploadForm);
router.get('/:id/edit', retrieveEditForm);
router.get('/logout', logout);

router.post('/upload', uploadNewBook);
router.put('/:id/edit', updateBook);
router.delete('/:id/delete', removeBook);

module.exports = router;
const express = require('express');
const { retrieveHomeDashboard, logout, retrieveUploadForm, uploadNewBook, retrieveEditForm, updateBook, removeBook, retrieveBooks, retrieveCarousel, killSelected } = require('../controller/private');
const { catchAsync } = require('../utils/errorHandler');
const router = express.Router();

router.get('/', catchAsync(retrieveHomeDashboard));
router.get('/books', catchAsync(retrieveBooks));
router.get('/carousel', retrieveCarousel);
router.get('/upload', retrieveUploadForm);
router.get('/:id/edit', catchAsync(retrieveEditForm));
router.get('/logout', logout);

router.post('/upload', catchAsync(uploadNewBook));
router.put('/:id/edit', catchAsync(updateBook));
router.delete('/:id/delete', catchAsync(removeBook));
router.post('/deleteSelected', catchAsync(killSelected));

module.exports = router;
const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/reviews', authMiddleware, reviewController.createReview);

module.exports = router;
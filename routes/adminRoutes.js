const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.post('/hotels', authMiddleware, isAdmin, adminController.createHotel);

module.exports = router;
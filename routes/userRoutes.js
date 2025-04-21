const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/hotels', authMiddleware, userController.getHotels);
router.post('/bookings', authMiddleware, userController.createBooking);
router.get('/bookings', authMiddleware, userController.getUserBookings);

module.exports = router;
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/bookings', authMiddleware, bookingController.createBooking);
router.get('/bookings', authMiddleware, bookingController.getUserBookings);

module.exports = router;
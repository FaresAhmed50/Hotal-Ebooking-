const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.post('/hotels', authMiddleware, isAdmin, hotelController.createHotel);
router.post('/rooms', authMiddleware, isAdmin, hotelController.createRoom);
router.get('/hotels', hotelController.getHotels);

module.exports = router;
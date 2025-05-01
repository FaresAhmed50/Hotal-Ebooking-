const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.post('/AddHotels', authMiddleware, isAdmin, hotelController.createHotel);
router.post('/rooms', authMiddleware, isAdmin, hotelController.createRoom);
router.get('/getAllHotels', hotelController.getHotels);

module.exports = router;
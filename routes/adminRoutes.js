const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Example of logging middleware for better traceability
router.use((req, res, next) => {
    console.log(`Admin Route Hit: ${req.method} ${req.originalUrl}`);
    next();
});

// Route to create a hotel, accessible only by admin users
router.post('/hotels', authMiddleware, isAdmin, adminController.createHotel);

module.exports = router;

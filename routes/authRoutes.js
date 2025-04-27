const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/set-admin', authMiddleware, isAdmin, authController.setAdmin);
router.put('/users/:id', authMiddleware, isAdmin, authController.updateUser);
router.delete('/users/:id', authMiddleware, isAdmin, authController.deleteUser);
router.get('/users/by-email', authMiddleware, isAdmin, authController.getUserByEmail);

module.exports = router;
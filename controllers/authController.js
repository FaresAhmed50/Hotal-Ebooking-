const User = require('../models/userModel');
const LoginLog = require('../models/loginLogModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    User.findByEmail(email, (err, existingUser) => {
      if (err) return res.status(500).json({ message: 'Server error' });
      if (existingUser) return res.status(400).json({ message: 'Email already registered' });

      User.create({ name, email, password }, (err) => {
        if (err) return res.status(500).json({ message: 'Registration failed' });
        res.status(201).json({ message: 'User registered successfully' });
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    User.findByEmail(email, async (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      if (user.status === 'banned') {
        return res.status(403).json({ message: 'Account is banned' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Log login attempt
      LoginLog.create(
        { user_id: user.id, ip_address: req.ip },
        (err) => {
          if (err) console.error('Failed to log login:', err);
        }
      );

      res.json({ token });
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
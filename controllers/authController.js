const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/userModel');
dotenv.config();

const logger = (message, error = null) => {
  // Custom logging function for debugging purposes
  console.log(message);
  if (error) {
    console.error('Error:', error);
    console.error('Stack trace:', error.stack);
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Password length validation
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists using User model
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database using User model
    await User.create({ name, email, password: hashedPassword });

    // Return a success response
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    logger('Registration error', err); // Log the error with a custom logger
    res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the account is banned
    if (user.status === 'banned') {
      return res.status(403).json({ message: 'Account is banned' });
    }

    // Create JWT token with additional claims (e.g., role)
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Use configurable JWT expiration
    );

    // Log the login event
    await db.query(
        'INSERT INTO login_logs (user_id, ip_address, login_time) VALUES (?, ?, ?)',
        [user.id, req.ip, new Date()]
    );

    res.json({ token });

  } catch (err) {
    logger('Login error', err); // Log the error with a custom logger
    res.status(500).json({ message: 'Server error during login' });
  }
};

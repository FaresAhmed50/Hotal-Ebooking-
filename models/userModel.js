const db = require('../models/db');
const bcrypt = require('bcrypt');

const User = {
  // Find user by email
  findByEmail: async (email) => {
    try {
      // Ensure you use the promise-based query
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];  // Return the first result or null if no user found
    } catch (err) {
      console.error('Error fetching user by email:', err);  // Handle any errors
      throw err;  // Rethrow the error for the calling function to handle
    }
  },

  // Create a new user
  create: async (userData) => {
    const { name, email, password } = userData;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (name, email, password, role, status)
        VALUES (?, ?, ?, 'user', 'active')
      `;
      // Execute the query using promise-based db connection
      await db.query(query, [name, email, hashedPassword]);
    } catch (err) {
      console.error('Error creating user:', err);
      throw err;
    }
  },
};

module.exports = User;

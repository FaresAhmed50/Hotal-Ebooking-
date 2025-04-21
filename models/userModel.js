const db = require('../models/db');
const bcrypt = require('bcrypt');

const User = {
  // Using async/await to create a new user
  create: async (userData) => {
    const { name, email, password } = userData;
    try {
      // Hash the password asynchronously
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
        INSERT INTO users (name, email, password, role, status)
        VALUES (?, ?, ?, 'user', 'active')
      `;

      // Insert the user into the database and return the result
      const [result] = await db.query(query, [name, email, hashedPassword]);
      return result;
    } catch (err) {
      throw new Error('Error creating user: ' + err.message);
    }
  },

  // Using async/await to find a user by email
  findByEmail: async (email) => {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [results] = await db.query(query, [email]);
      if (results.length === 0) return null; // No user found
      return results[0]; // Return the first user
    } catch (err) {
      throw new Error('Error fetching user by email: ' + err.message);
    }
  },
};

module.exports = User;

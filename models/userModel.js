const db = require('./db');
const bcrypt = require('bcrypt');

const User = {
  create: (userData) => {
    return new Promise((resolve, reject) => {
      const { name, email, password } = userData;
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return reject(err);

        const query = `
          INSERT INTO users (name, email, password, role, status)
          VALUES (?, ?, ?, 'user', 'active')
        `;

        db.query(query, [name, email, hashedPassword], (err, results) => {
          if (err) return reject(err);
          resolve(results);
        });
      });
    });
  },

  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null); // No user found
        resolve(results[0]);
      });
    });
  },
};

module.exports = User;

const db = require('./db');
const bcrypt = require('bcrypt');

const User = {
  create: (userData, callback) => {
    const { name, email, password } = userData;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return callback(err);
      const query = `
        INSERT INTO users (name, email, password, role, status)
        VALUES (?, ?, ?, 'user', 'active')
      `;
      db.query(query, [name, email, hashedPassword], callback);
    });
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  },
};

module.exports = User;
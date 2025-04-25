const db = require('./db');
const bcrypt = require('bcrypt');

const User = {
  async create({ name, email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    return result;
  },

  async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  async updateStatus(id, status) {
    const [result] = await db.query(
      'UPDATE users SET status = ? WHERE id = ?',
      [status, id]
    );
    return result;
  }
};

module.exports = User;
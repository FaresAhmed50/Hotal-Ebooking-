const db = require('./db');

const Hotel = {
  findAll: (callback) => {
    const query = 'SELECT * FROM hotels';
    db.query(query, callback);
  },

  create: (hotelData, callback) => {
    const { name, city, price, description } = hotelData;
    const query = `
      INSERT INTO hotels (name, city, price, description)
      VALUES (?, ?, ?, ?)
    `;
    db.query(query, [name, city, price, description], callback);
  },
};

module.exports = Hotel;
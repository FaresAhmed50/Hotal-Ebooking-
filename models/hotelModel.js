const db = require('../models/db');

const Hotel = {
  // Using async/await for findAll
  findAll: async () => {
    const query = 'SELECT * FROM hotels';
    try {
      const [rows] = await db.query(query); // Await the result of the query
      return rows; // Return the result (rows)
    } catch (err) {
      throw new Error('Error fetching hotels: ' + err.message);
    }
  },

  // Using async/await for create
  create: async (hotelData) => {
    const { name, city, price, description } = hotelData;
    const query = `
      INSERT INTO hotels (name, city, price, description)
      VALUES (?, ?, ?, ?)
    `;
    try {
      const [result] = await db.query(query, [name, city, price, description]);
      return result; // Return the result (typically the ID of the newly created hotel)
    } catch (err) {
      throw new Error('Error creating hotel: ' + err.message);
    }
  },
};

module.exports = Hotel;

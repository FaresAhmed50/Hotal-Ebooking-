const db = require('../models/db');

const Booking = {
  // Create a booking
  create: async (bookingData) => {
    const { user_id, hotel_id, check_in, check_out, guests } = bookingData;
    const query = `
      INSERT INTO bookings (user_id, hotel_id, check_in, check_out, guests)
      VALUES (?, ?, ?, ?, ?)
    `;
    try {
      // Execute query and return the result
      const [result] = await db.query(query, [user_id, hotel_id, check_in, check_out, guests]);
      return result;
    } catch (err) {
      throw new Error('Error creating booking: ' + err.message);
    }
  },

  // Find bookings by user ID
  findByUser: async (user_id) => {
    const query = `
      SELECT b.*, h.name AS hotel_name
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      WHERE b.user_id = ?
    `;
    try {
      // Execute query and return the result
      const [results] = await db.query(query, [user_id]);
      return results;
    } catch (err) {
      throw new Error('Error fetching bookings: ' + err.message);
    }
  },
};

module.exports = Booking;

const db = require('./db');

const Booking = {
  create: (bookingData, callback) => {
    const { user_id, hotel_id, check_in, check_out, guests } = bookingData;
    const query = `
      INSERT INTO bookings (user_id, hotel_id, check_in, check_out, guests)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(query, [user_id, hotel_id, check_in, check_out, guests], callback);
  },

  findByUser: (user_id, callback) => {
    const query = `
      SELECT b.*, h.name AS hotel_name
      FROM bookings b
      JOIN hotels h ON b.hotel_id = h.id
      WHERE b.user_id = ?
    `;
    db.query(query, [user_id], callback);
  },
};

module.exports = Booking;
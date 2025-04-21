const db = require('../models/db');
const Hotel = require('../models/hotelModel');
const Booking = require('../models/bookingModel');

exports.getHotels = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM hotels');
    res.json(results);
  } catch (err) {
    console.error('Error fetching hotels:', err);
    res.status(500).json({ message: 'Server error while fetching hotels' });
  }
};

exports.createBooking = async (req, res) => {
  const { hotel_id, check_in, check_out, guests } = req.body;

  if (!hotel_id || !check_in || !check_out || !guests) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const bookingData = {
    user_id: req.user.id,
    hotel_id,
    check_in,
    check_out,
    guests,
  };

  try {
    // Insert booking into database
    await db.query(
        'INSERT INTO bookings (user_id, hotel_id, check_in, check_out, guests) VALUES (?, ?, ?, ?, ?)',
        [bookingData.user_id, bookingData.hotel_id, bookingData.check_in, bookingData.check_out, bookingData.guests]
    );
    res.status(201).json({ message: 'Booking created successfully' });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ message: 'Booking failed' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM bookings WHERE user_id = ?', [req.user.id]);
    res.json(results);
  } catch (err) {
    console.error('Error fetching user bookings:', err);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

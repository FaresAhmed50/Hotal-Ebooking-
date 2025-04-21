const Hotel = require('../models/hotelModel');
const Booking = require('../models/bookingModel');

exports.getHotels = (req, res) => {
  Hotel.findAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};

exports.createBooking = (req, res) => {
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

  Booking.create(bookingData, (err) => {
    if (err) return res.status(500).json({ message: 'Booking failed' });
    res.status(201).json({ message: 'Booking created successfully' });
  });
};

exports.getUserBookings = (req, res) => {
  Booking.findByUser(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json(results);
  });
};
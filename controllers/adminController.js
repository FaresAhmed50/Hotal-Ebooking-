const Hotel = require('../models/hotelModel');

exports.createHotel = (req, res) => {
  const { name, city, price, description } = req.body;
  if (!name || !city || !price) {
    return res.status(400).json({ message: 'Name, city, and price are required' });
  }

  Hotel.create({ name, city, price, description }, (err) => {
    if (err) return res.status(500).json({ message: 'Failed to create hotel' });
    res.status(201).json({ message: 'Hotel created successfully' });
  });
};
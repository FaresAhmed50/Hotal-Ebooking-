const db = require('../models/db');

exports.createHotel = async (req, res) => {
  const { name, city, price, description } = req.body;

  if (!name || !city || !price) {
    return res.status(400).json({ message: 'Name, city, and price are required' });
  }

  try {
    const [result] = await db.query(
        'INSERT INTO hotels (name, city, price, description) VALUES (?, ?, ?, ?)',
        [name, city, price, description || null]
    );

    res.status(201).json({
      message: 'Hotel created successfully',
      hotelId: result.insertId,
    });
  } catch (err) {
    console.error('Error creating hotel:', err);
    res.status(500).json({ message: 'Failed to create hotel' });
  }
};

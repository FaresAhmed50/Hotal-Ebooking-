const prisma = require('../models/prisma');

exports.createReview = async (req, res) => {
  try {
    const { hotelId, rating, comment } = req.body;
    const userId = req.user.id;

    if (!hotelId || !rating) {
      return res.status(400).json({ message: 'Hotel ID and rating are required' });
    }

    const review = await prisma.review.create({
      data: {
        userId,
        hotelId,
        rating,
        comment,
      },
    });

    res.status(201).json({ message: 'Review created successfully', review });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Failed to create review', error: error.message });
  }
};
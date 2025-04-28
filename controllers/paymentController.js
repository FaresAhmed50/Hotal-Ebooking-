// const prisma = require('../models/prisma');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createPayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod, paymentStatus } = req.body;
    const userId = req.user.id;

    if (!bookingId || !amount || !paymentMethod) {
      return res.status(400).json({ message: 'Booking ID, amount, and payment method are required' });
    }

    const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking || booking.userId !== userId) {
      return res.status(400).json({ message: 'Invalid booking' });
    }

    const payment = await prisma.payment.create({
      data: {
        bookingId,
        userId,
        amount,
        paymentMethod,
        paymentStatus: paymentStatus || 'completed',
      },
    });

    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({ message: 'Failed to create payment', error: error.message });
  }
};
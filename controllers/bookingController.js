const prisma = require('../models/prisma');

exports.createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, totalPrice, bookingStatus } = req.body;
    const userId = req.user.id;

    if (!roomId || !checkInDate || !checkOutDate || !totalPrice) {
      return res.status(400).json({ message: 'Room ID, check-in, check-out, and total price are required' });
    }

    const room = await prisma.room.findUnique({ where: { id: roomId } });
    if (!room || !room.availability) {
      return res.status(400).json({ message: 'Room not available' });
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        roomId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        totalPrice,
        bookingStatus: bookingStatus || 'confirmed',
      },
    });

    // Update room availability
    await prisma.room.update({
      where: { id: roomId },
      data: { availability: false },
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: { room: { include: { hotel: true } } },
    });
    res.json(bookings);
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
};
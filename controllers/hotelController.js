// const prisma = require('../models/prisma');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createHotel = async (req, res) => {
  try {
    const { name, location, description, starRating, amenities, contactInfo } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: 'Name and location are required' });
    }

    const hotel = await prisma.hotel.create({
      data: {
        name,
        location,
        description,
        starRating,
        amenities,
        contactInfo,
      },
    });

    res.status(201).json({ message: 'Hotel created successfully', hotel });
  } catch (error) {
    console.error('Create hotel error:', error);
    res.status(500).json({ message: 'Failed to create hotel', error: error.message });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { hotelId, roomType, price, availability, features } = req.body;

    if (!hotelId || !roomType || !price) {
      return res.status(400).json({ message: 'Hotel ID, room type, and price are required' });
    }

    const room = await prisma.room.create({
      data: {
        hotelId,
        roomType,
        price,
        availability,
        features,
      },
    });

    res.status(201).json({ message: 'Room created successfully', room });
  } catch (error) {
    console.error('Create room error:', error);
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await prisma.hotel.findMany({
      include: { rooms: true },
    });
    res.json(hotels);
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({ message: 'Failed to fetch hotels', error: error.message });
  }
};
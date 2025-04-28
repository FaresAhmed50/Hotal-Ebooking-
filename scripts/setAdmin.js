const prisma = require('../models/prisma');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();


async function setAdmin(userId) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: 'admin' },
    });
    console.log(`User ${userId} updated to admin:`, user);
  } catch (error) {
    console.error('Error updating user role:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Set user with ID 1 as admin
setAdmin(1);
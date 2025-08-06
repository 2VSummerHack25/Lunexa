import express from 'express';
import prisma from '../tools/prisma.js';
import Logger from '../tools/logger.js';

const router = express.Router();

// Get user's availability
router.get('/user/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;

    const availability = await prisma.availability.findMany({
      where: { userId },
      orderBy: { dayOfWeek: 'asc' }
    });

    response.json(availability);
  } catch (error) {
    next(error);
  }
});

// Update user's availability
router.put('/user/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;
    const { availability } = request.body;

    // Delete existing availability
    await prisma.availability.deleteMany({
      where: { userId }
    });

    // Create new availability entries
    const newAvailability = await prisma.availability.createMany({
      data: availability.map(avail => ({
        userId,
        dayOfWeek: avail.dayOfWeek,
        startTime: avail.startTime,
        endTime: avail.endTime,
        isAvailable: avail.isAvailable
      }))
    });

    // Get updated availability
    const updatedAvailability = await prisma.availability.findMany({
      where: { userId },
      orderBy: { dayOfWeek: 'asc' }
    });

    response.json(updatedAvailability);
  } catch (error) {
    next(error);
  }
});

// Check mutual availability between two users
router.get('/mutual/:user1Id/:user2Id', async (request, response, next) => {
  try {
    const { user1Id, user2Id } = request.params;

    const [user1Availability, user2Availability] = await Promise.all([
      prisma.availability.findMany({
        where: { userId: user1Id, isAvailable: true }
      }),
      prisma.availability.findMany({
        where: { userId: user2Id, isAvailable: true }
      })
    ]);

    // Find overlapping availability
    const mutualAvailability = user1Availability.filter(avail1 =>
      user2Availability.some(avail2 =>
        avail2.dayOfWeek === avail1.dayOfWeek &&
        avail2.startTime <= avail1.endTime &&
        avail2.endTime >= avail1.startTime
      )
    ).map(avail1 => {
      const avail2 = user2Availability.find(a => a.dayOfWeek === avail1.dayOfWeek);
      return {
        dayOfWeek: avail1.dayOfWeek,
        startTime: avail1.startTime > avail2.startTime ? avail1.startTime : avail2.startTime,
        endTime: avail1.endTime < avail2.endTime ? avail1.endTime : avail2.endTime
      };
    });

    response.json(mutualAvailability);
  } catch (error) {
    next(error);
  }
});

export default router;
import express from 'express';
import prisma from '../tools/prisma.js';
import Logger from '../tools/logger.js';

const router = express.Router();

// Get all users for exploration
router.get('/', async (request, response, next) => {
  try {
    const { page = 1, limit = 20, department, level, interests } = request.query;
    const skip = (page - 1) * limit;
    
    const where = {};
    if (department) where.department = department;
    if (level) where.level = level;
    if (interests) {
      where.interests = {
        hasSome: interests.split(',')
      };
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        role: true,
        department: true,
        level: true,
        bio: true,
        interests: true,
        goals: true,
        profileCompleted: true,
        createdAt: true,
      },
      skip: parseInt(skip),
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });

    const total = await prisma.user.count({ where });

    response.json({
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// Get user by ID
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        level: true,
        bio: true,
        interests: true,
        goals: true,
        profileCompleted: true,
        surveyCompleted: true,
        createdAt: true,
        availability: {
          select: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
            isAvailable: true
          }
        }
      }
    });

    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    response.json(user);
  } catch (error) {
    next(error);
  }
});

// Create new user
router.post('/', async (request, response, next) => {
  try {
    const { name, email, role, department, level, bio, interests, goals } = request.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        role,
        department,
        level,
        bio,
        interests: interests || [],
        goals: goals || [],
        profileCompleted: false,
        surveyCompleted: false
      }
    });

    // Create default action items for new user
    await prisma.actionItem.createMany({
      data: [
        {
          userId: user.id,
          type: 'PROFILE_COMPLETION',
          title: 'Complete your profile',
          description: 'Add your bio, interests, and goals to improve matching',
          priority: 'HIGH'
        },
        {
          userId: user.id,
          type: 'AVAILABILITY_UPDATE',
          title: 'Set your availability',
          description: 'Let others know when you\'re available for meetings',
          priority: 'HIGH'
        }
      ]
    });

    response.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Update user
router.patch('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const user = await prisma.user.update({
      where: { id },
      data: updateData
    });

    response.json(user);
  } catch (error) {
    next(error);
  }
});

// Delete user
router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    
    await prisma.user.delete({
      where: { id }
    });

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
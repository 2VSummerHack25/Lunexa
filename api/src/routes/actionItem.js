import express from 'express';
import prisma from '../tools/prisma.js';
import Logger from '../tools/logger.js';

const router = express.Router();

// Get user's action items
router.get('/user/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;
    const { completed } = request.query;

    const where = { userId };
    if (completed !== undefined) {
      where.isCompleted = completed === 'true';
    }

    const actionItems = await prisma.actionItem.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'asc' }
      ]
    });

    response.json(actionItems);
  } catch (error) {
    next(error);
  }
});

// Create action item
router.post('/', async (request, response, next) => {
  try {
    const { userId, type, title, description, priority, dueDate } = request.body;

    const actionItem = await prisma.actionItem.create({
      data: {
        userId,
        type,
        title,
        description,
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null
      }
    });

    response.status(201).json(actionItem);
  } catch (error) {
    next(error);
  }
});

// Update action item
router.patch('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;
    const updateData = request.body;

    const actionItem = await prisma.actionItem.update({
      where: { id },
      data: updateData
    });

    response.json(actionItem);
  } catch (error) {
    next(error);
  }
});

// Mark action item as completed
router.patch('/:id/complete', async (request, response, next) => {
  try {
    const { id } = request.params;

    const actionItem = await prisma.actionItem.update({
      where: { id },
      data: { isCompleted: true }
    });

    response.json(actionItem);
  } catch (error) {
    next(error);
  }
});

// Delete action item
router.delete('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;

    await prisma.actionItem.delete({
      where: { id }
    });

    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
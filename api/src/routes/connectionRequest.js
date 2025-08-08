import express from 'express';
import prisma from '../tools/prisma.js';
import Logger from '../tools/logger.js';

const router = express.Router();

// Send connection request
router.post('/', async (request, response, next) => {
  try {
    const { senderId, receiverId, message } = request.body;

    // Check if request already exists
    const existingRequest = await prisma.connectionRequest.findUnique({
      where: {
        senderId_receiverId: {
          senderId,
          receiverId
        }
      }
    });

    if (existingRequest) {
      return response.status(400).json({ 
        message: 'Connection request already exists' 
      });
    }

    const connectionRequest = await prisma.connectionRequest.create({
      data: {
        senderId,
        receiverId,
        message,
        status: 'PENDING'
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
            department: true
          }
        },
        receiver: {
          select: {
            id: true,
            name: true,
            role: true,
            department: true
          }
        }
      }
    });

    response.status(201).json(connectionRequest);
  } catch (error) {
    next(error);
  }
});

// Get user's sent requests
router.get('/sent/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;

    const requests = await prisma.connectionRequest.findMany({
      where: { senderId: userId },
      include: {
        receiver: {
          select: {
            id: true,
            name: true,
            role: true,
            department: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    response.json(requests);
  } catch (error) {
    next(error);
  }
});

// Get user's received requests
router.get('/received/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;

    const requests = await prisma.connectionRequest.findMany({
      where: { receiverId: userId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            role: true,
            department: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    response.json(requests);
  } catch (error) {
    next(error);
  }
});

// Accept connection request
router.patch('/:id/accept', async (request, response, next) => {
  try {
    const { id } = request.params;

    const request = await prisma.connectionRequest.update({
      where: { id },
      data: { status: 'ACCEPTED' },
      include: {
        sender: true,
        receiver: true
      }
    });

    // Create a match
    const match = await prisma.match.create({
      data: {
        user1Id: request.senderId,
        user2Id: request.receiverId,
        matchScore: 50, // Default score for accepted requests
        matchReason: 'Mutual connection request accepted',
        status: 'ACTIVE'
      }
    });

    response.json({ request, match });
  } catch (error) {
    next(error);
  }
});

// Decline connection request
router.patch('/:id/decline', async (request, response, next) => {
  try {
    const { id } = request.params;

    const connectionRequest = await prisma.connectionRequest.update({
      where: { id },
      data: { status: 'DECLINED' }
    });

    response.json(connectionRequest);
  } catch (error) {
    next(error);
  }
});

export default router;
import express from 'express';
import prisma from '../tools/prisma.js';
import { extractMatchedUsers } from '../util/matchUtil.js';
import { RequestError, NotFoundError } from '../constants/commonErrors.js';

const router = express.Router();

function validateUserId(userId) {
  if (!userId) {
    throw new RequestError('Missing user id');
  }

  if (userId.length < 32) {
    throw new NotFoundError(`No user found for ID: ${userId}`);
  }
}

router.get('/', async (request, response, next) => {
  try {
    response.json({
      message: 'User routes are working',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (request, response, next) => {
  const { userId } = request.params;

  try {
    validateUserId(userId);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    return response.json(user);
  } catch (error) {
    return next(error);
  }
});

router.patch('/:id', async (request, response, next) => {
  try {
    response.json({
      message: `Update user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (request, response, next) => {
  try {
    response.json({
      message: `Delete user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:userId/matches', async (request, response, next) => {
  const { userId } = request.params;

  try {
    validateUserId(userId);

    // make sure user exists in our database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundError(`User with ID ${userId} not found`);
    }

    const matches = await prisma.match.findMany({
      where: {
        participants: { some: { userId } },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], //order by newest + id
      include: {
        //this is the info we grab for each participants object
        participants: {
          select: {
            userId: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    extractMatchedUsers(matches, userId);
    return response.json(matches);
  } catch (error) {
    return next(error);
  }
});

export default router;

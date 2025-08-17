import express from 'express';
import { prisma } from '../tools/prisma.js';
import { Status } from '@prisma/client';

const router = express.Router();

router.get('/', async (request, response, next) => {
  try {
    response.json({
      message: 'User routes are working',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  try {
    response.json({
      message: `Get user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
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

function isUuid(userId) {
  if (typeof userId !== 'string') return false;

  // Regex for UUID v1-v5
  const uuidRegex =
    /^[\da-f]{8}-[\da-f]{4}-[1-5][\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
  return uuidRegex.test(userId);
}

router.get('/:userId/matches', async (req, res, next) => {
  const { userId } = req.params;

  // validate userId
  if (!userId) return res.status(400).json({ error: 'Missing user id.' });
  if (!isUuid(userId))
    return res
      .status(400)
      .json({ error: 'Invalid user id format (must be UUID).' });

  //working with inputted limit
  const limitRaw = req.query.limit ?? '20'; //default is to return 20 users at a time
  //convert limit to a number, check if it's a real number, check is between 1-100
  const take = Number.isFinite(+limitRaw)
    ? Math.max(1, Math.min(100, Number.parseInt(limitRaw, 10)))
    : 20;

  //working with pagination
  const cursor = req.query.cursor ?? null; //save given cursor (if any), default is null
  const statusParam = (req.query.status ?? '').toString(); //save given status to filter through (if any)
  const statusFilter = statusParam
    ? statusParam
        .split(',') //allows for listing of statuses
        .map(s => s.trim().toUpperCase()) //capitalizes statuses
        .filter(s => Status.has(s)) //only keeps values in our set
    : null;

  try {
    //make sure user exists in our database
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!userExists) return res.status(404).json({ error: 'User not found.' });

    const where = {
      participants: { some: { userId } }, //look for participants objects that user is included
      ...(statusFilter && statusFilter.length > 0
        ? { status: { in: statusFilter } }
        : {}),
    };

    //build a list of matches
    const matches = await prisma.match.findMany({
      where,
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], //order by newest + id
      take: take + 1, //check for additional user matches
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
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
                role: true,
              },
            },
          },
        },
      },
    });

    //pagination
    const hasMore = matches.length > take; //check for more matches
    const pageItems = hasMore ? matches.slice(0, take) : matches; //return # of the take
    const nextCursor = hasMore ? matches[take].id : null; //setup starting point for next api call

    // Format response for the frontend
    const formatted = pageItems.map(m => {
      //
      const participantsIds = m.participants.map(p => p.userId);

      //create a user list that the inputted user matched with
      const matchedUsers = m.participants
        .filter(p => p.userId !== userId) //filter based on id, ignore input userId
        .map(p => p.user); //develop a list of userObjects based on matched userIds

      return {
        matchId: m.id,
        reason: m.reason,
        status: m.status,
        createdAt: m.createdAt,
        participants: participantsIds,
        matchedUsers,
      };
    });

    //respond
    return res.json({
      meta: {
        userId,
        statusFilter: statusFilter ?? [],
        pageSize: take,
        hasMore,
        nextCursor,
      },
      data: formatted,
    });
  } catch (error) {
    // prisma error hints (optional nice-to-haves)
    if (error?.code === 'P2023') {
      return res.status(400).json({ error: 'Invalid cursor.' });
    }
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Resource not found.' });
    }
    return next(error);
  }
});

export default router;

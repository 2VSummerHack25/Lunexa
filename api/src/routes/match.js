import express from 'express';
import prisma from '../tools/prisma.js';
import Logger from '../tools/logger.js';

const router = express.Router();

// Get user's matches
router.get('/user/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;
    
    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId }
        ],
        status: 'ACTIVE'
      },
      include: {
        user1: {
          select: {
            id: true,
            name: true,
            role: true,
            department: true,
            level: true,
            bio: true,
            interests: true
          }
        },
        user2: {
          select: {
            id: true,
            name: true,
            role: true,
            department: true,
            level: true,
            bio: true,
            interests: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Format matches to show the other user
    const formattedMatches = matches.map(match => ({
      id: match.id,
      matchScore: match.matchScore,
      matchReason: match.matchReason,
      createdAt: match.createdAt,
      otherUser: match.user1Id === userId ? match.user2 : match.user1
    }));

    response.json(formattedMatches);
  } catch (error) {
    next(error);
  }
});

// Get potential matches for exploration
router.get('/explore/:userId', async (request, response, next) => {
  try {
    const { userId } = request.params;
    const { limit = 10 } = request.query;

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        department: true,
        level: true,
        interests: true,
        goals: true
      }
    });

    if (!currentUser) {
      return response.status(404).json({ message: 'User not found' });
    }

    // Get users that haven't been matched or requested
    const existingMatches = await prisma.match.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId }
        ]
      },
      select: {
        user1Id: true,
        user2Id: true
      }
    });

    const existingRequests = await prisma.connectionRequest.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      select: {
        senderId: true,
        receiverId: true
      }
    });

    const excludedUserIds = new Set([
      userId,
      ...existingMatches.map(m => m.user1Id === userId ? m.user2Id : m.user1Id),
      ...existingRequests.map(r => r.senderId === userId ? r.receiverId : r.senderId)
    ]);

    // Find potential matches
    const potentialMatches = await prisma.user.findMany({
      where: {
        id: { notIn: Array.from(excludedUserIds) },
        profileCompleted: true
      },
      select: {
        id: true,
        name: true,
        role: true,
        department: true,
        level: true,
        bio: true,
        interests: true,
        goals: true,
        profileCompleted: true
      },
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' }
    });

    // Calculate match scores
    const scoredMatches = potentialMatches.map(user => {
      let score = 0;
      let reasons = [];

      // Role similarity
      if (user.role === currentUser.role) {
        score += 30;
        reasons.push('Same role');
      }

      // Department similarity
      if (user.department === currentUser.department) {
        score += 20;
        reasons.push('Same department');
      }

      // Level similarity
      if (user.level === currentUser.level) {
        score += 15;
        reasons.push('Same level');
      }

      // Interest overlap
      const commonInterests = currentUser.interests.filter(interest => 
        user.interests.includes(interest)
      );
      if (commonInterests.length > 0) {
        score += commonInterests.length * 10;
        reasons.push(`Shared interests: ${commonInterests.join(', ')}`);
      }

      // Goal overlap
      const commonGoals = currentUser.goals.filter(goal => 
        user.goals.includes(goal)
      );
      if (commonGoals.length > 0) {
        score += commonGoals.length * 5;
        reasons.push(`Shared goals: ${commonGoals.join(', ')}`);
      }

      return {
        ...user,
        matchScore: Math.min(score, 100),
        matchReasons: reasons
      };
    });

    // Sort by match score
    scoredMatches.sort((a, b) => b.matchScore - a.matchScore);

    response.json(scoredMatches);
  } catch (error) {
    next(error);
  }
});

// Create a match (when connection request is accepted)
router.post('/', async (request, response, next) => {
  try {
    const { user1Id, user2Id, matchScore, matchReason } = request.body;

    const match = await prisma.match.create({
      data: {
        user1Id,
        user2Id,
        matchScore,
        matchReason,
        status: 'ACTIVE'
      }
    });

    response.status(201).json(match);
  } catch (error) {
    next(error);
  }
});

export default router;
import express from 'express';
import prisma from '../tools/prisma.js';
import Logger from '../tools/logger.js';

const router = express.Router();

// Get active surveys
router.get('/', async (request, response, next) => {
  try {
    const surveys = await prisma.survey.findMany({
      where: { isActive: true },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    response.json(surveys);
  } catch (error) {
    next(error);
  }
});

// Get survey by ID
router.get('/:id', async (request, response, next) => {
  try {
    const { id } = request.params;

    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!survey) {
      return response.status(404).json({ message: 'Survey not found' });
    }

    response.json(survey);
  } catch (error) {
    next(error);
  }
});

// Submit survey responses
router.post('/:surveyId/responses', async (request, response, next) => {
  try {
    const { surveyId } = request.params;
    const { userId, responses } = request.body;

    // Validate survey exists
    const survey = await prisma.survey.findUnique({
      where: { id: surveyId }
    });

    if (!survey) {
      return response.status(404).json({ message: 'Survey not found' });
    }

    // Create responses
    const surveyResponses = await Promise.all(
      responses.map(response =>
        prisma.surveyResponse.create({
          data: {
            userId,
            surveyId,
            questionId: response.questionId,
            answer: response.answer
          }
        })
      )
    );

    // Mark user as completed survey
    await prisma.user.update({
      where: { id: userId },
      data: { surveyCompleted: true }
    });

    // Create action item for profile completion if not done
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { profileCompleted: true }
    });

    if (!user.profileCompleted) {
      await prisma.actionItem.create({
        data: {
          userId,
          type: 'PROFILE_COMPLETION',
          title: 'Complete your profile',
          description: 'Add your bio, interests, and goals to improve matching',
          priority: 'HIGH'
        }
      });
    }

    response.status(201).json(surveyResponses);
  } catch (error) {
    next(error);
  }
});

// Get user's survey responses
router.get('/user/:userId/responses', async (request, response, next) => {
  try {
    const { userId } = request.params;

    const responses = await prisma.surveyResponse.findMany({
      where: { userId },
      include: {
        survey: true,
        question: true
      },
      orderBy: { createdAt: 'desc' }
    });

    response.json(responses);
  } catch (error) {
    next(error);
  }
});

export default router;
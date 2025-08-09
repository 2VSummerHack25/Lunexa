import express from 'express';

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

router.get('/:id/matches', async (request, response, next) => {
  try {
    response.json({
      message: `Retrieve matches for user by ID route is working for ID: ${request.params.id}`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

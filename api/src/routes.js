import express from 'express';
import userRoutes from './routes/user.js';
import matchRoutes from './routes/match.js';
import surveyRoutes from './routes/survey.js';
import actionItemRoutes from './routes/actionItem.js';
import availabilityRoutes from './routes/availability.js';
import connectionRequestRoutes from './routes/connectionRequest.js';

export default express
  .Router()
  .use('/user', userRoutes)
  .use('/match', matchRoutes)
  .use('/survey', surveyRoutes)
  .use('/action-item', actionItemRoutes)
  .use('/availability', availabilityRoutes)
  .use('/connection-request', connectionRequestRoutes)
  .use('/debug', (req, res) => {
    res.json({
      message: 'Debug endpoint is active',
      timestamp: new Date().toISOString(),
      method: req.method,
    });
  });
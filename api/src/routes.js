import express from 'express';
import userRoutes from './routes/user.js';

export default express
  .Router()
  .use('/user', userRoutes)
  .use('/debug', (req, res) => {
    res.json({
      message: 'Debug endpoint is active',
      timestamp: new Date().toISOString(),
      method: req.method,
    });
  });

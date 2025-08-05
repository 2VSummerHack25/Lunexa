import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import routes from './routes.js';
import morganMiddleware from './middleware/morgan.js';
import errorHandler from './middleware/errorHandler.js';

export default express()
  .use(cookieParser())
  .use(compression({ filter: shouldCompress }))
  .use(morganMiddleware)
  .get('/robots.txt', function (request, response) {
    response.type('text/plain');
    response.send('User-agent: *\nDisallow: /');
  })
  .use(helmet())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get('/', (request, response) => {
    response.status(200).send(`
        <div style="text-align: center">
          <h1>Summer Project 2025 API</h1>
        </div>
      `);
  })
  .use('/', routes)
  .use(errorHandler)
  .use('/*splat', async (request, response) => {
    response.status(404).json({
      message: 'Endpoint does not exist',
    });
  });

function shouldCompress(request, response) {
  if (request.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  return compression.filter(request, response);
}

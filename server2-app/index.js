
require('dotenv').config();
const express = require('express');
const logger = require('./logger');
require('./tracing'); 

const app = express();
const port = process.env.PORT || 3001; 

app.use(express.json());


app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const logData = {
      server: 'server2', 
      route: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: Date.now() - start,
      timestamp: new Date().toISOString(),
      clientIP: req.ip,
      userAgent: req.headers['user-agent']
    };
    if (res.statusCode >= 400) {
      logger.error(`⚠️ Server2 API Error: ${req.method} ${req.originalUrl}`, logData);
    } else {
      logger.info(`✅ Server2 API Call: ${req.method} ${req.originalUrl}`, logData);
    }
  });
  next();
});


app.get('/', (req, res) => {
  res.send('Hello from the new API server on port 3001!');
});

app.get('/fail', (req, res) => {
  throw new Error('Simulated API Failure on new server');
});

app.listen(port, () => {
  logger.info(`🚀 Server running on http://localhost:${port}`);
});

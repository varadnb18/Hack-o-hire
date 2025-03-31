
require('dotenv').config();
const express = require('express');
const logger = require('./logger');

const app = express();
const port = process.env.PORT || 3000; 

app.use(express.json());

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const logData = {
      server: 'server1', 
      route: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      responseTime: Date.now() - start,
      timestamp: new Date().toISOString(),
      clientIP: req.ip,
      userAgent: req.headers['user-agent']
    };
    if (res.statusCode >= 400) {
      logger.error(`⚠️ Server1 API Error: ${req.method} ${req.originalUrl}`, logData);
    } else {
      logger.info(`✅ Server1 API Call: ${req.method} ${req.originalUrl}`, logData);
    }
  });
  next();
});

app.get('/', (req, res) => {
  const randomValue = Math.random() * 100;
  if (randomValue > 70 && randomValue <= 95) {
    return res.status(404).json({ error: 'Not Found' });
  } else if (randomValue > 95) {
    throw new Error('Simulated API Failure');
  }
  res.send('Hello, OpenTelemetry & Elasticsearch!');
});

app.use((err, req, res, next) => {
  logger.error(`❌ Server Error: ${req.method} ${req.originalUrl} - ${err.message}`);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  logger.info(`🚀 Server running on http://localhost:${port}`);
});
































// // index.js
// require('dotenv').config();
// const express = require('express');
// const logger = require('./logger');

// const app = express();
// const port = process.env.PORT || 3000; 

// app.use(express.json());


// app.use((req, res, next) => {
//   const start = Date.now();
//   res.on('finish', () => {
//     const logData = {
//       server: 'server1', 
//       route: req.originalUrl,
//       method: req.method,
//       statusCode: res.statusCode,
//       responseTime: Date.now() - start,
//       timestamp: new Date().toISOString(),
//       clientIP: req.ip,
//       userAgent: req.headers['user-agent']
//     };
//     if (res.statusCode >= 400) {
//       logger.error(`⚠️ Server1 API Error: ${req.method} ${req.originalUrl}`, logData);
//     } else {
//       logger.info(`✅ Server1 API Call: ${req.method} ${req.originalUrl}`, logData);
//     }
//   });
//   next();
// });


// app.get('/', (req, res) => {
//   res.send('Hello, OpenTelemetry & Elasticsearch!');
// });

// app.get('/fail', (req, res) => {
//   throw new Error('Simulated API Failure');
// });

// app.listen(port, () => {
//   logger.info(`🚀 Server running on http://localhost:${port}`);
// });

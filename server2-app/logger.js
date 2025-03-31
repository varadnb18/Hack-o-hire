// logger.js
require('dotenv').config();
const winston = require('winston');
const Elasticsearch = require('winston-elasticsearch');

const esTransportOpts = {
  level: 'info',
  clientOpts: {
    node: process.env.ES_NODE, // e.g., http://elasticsearch:9200
    auth: {
      username: process.env.ES_SERVICE_USERNAME,
      password: process.env.ES_SERVICE_PASSWORD,
      bearer: process.env.ES_SERVICE_TOKEN
    },
  },
  indexPrefix: 'app-logs',
};

const esTransport = new Elasticsearch.ElasticsearchTransport(esTransportOpts);
esTransport.on('error', (err) => console.error('Elasticsearch Transport Error:', err));

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    esTransport,
  ],
});

module.exports = logger;

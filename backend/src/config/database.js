const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
  user: config.databaseUsername,
  host: '10.211.55.6',
  password: config.databasePassword,
  database: config.databaseName,
  port: 5432,
});

module.exports = db;

const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
  user: config.databaseUsername,
  host: config.databaseHost,
  password: config.databasePassword,
  database: config.databaseName,
  port: config.portname,
});

module.exports = db;

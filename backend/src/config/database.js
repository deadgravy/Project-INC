const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
  user: config.databaseUsername,
  host: 'aws-test2.cbmxncunwsgi.us-east-1.rds.amazonaws.com',
  password: config.databasePassword,
  database: config.databaseName,
  port: config.portname,
});

module.exports = db;

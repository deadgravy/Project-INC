const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
  user: config.databaseUsername,
  host: 'firc-teama.cbmxncunwsgi.us-east-1.rds.amazonaws.com',
  password: config.databasePassword,
  database: config.userDBName,
  port: config.portname,
});

module.exports = db;

const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
  user: config.databaseUsername,
<<<<<<< HEAD
<<<<<<< HEAD
  host: config.databaseHost,
=======
  host: 'localhost',
>>>>>>> 013d1181 (update for SPFD)
=======
  host: 'localhost',
>>>>>>> 013d1181 (update for SPFD)
  password: config.databasePassword,
  database: config.databaseName,
  port: config.portname,
});

module.exports = db;

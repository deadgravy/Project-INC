const { Pool } = require('pg');
const config = require('./config');

const db = new Pool({
  user: config.databaseUsername,
<<<<<<< HEAD
  host: 'localhost',
=======
<<<<<<< HEAD
  host: config.databaseHost,
=======
  host: 'localhost',
>>>>>>> 013d1181 (update for SPFD)
>>>>>>> 398f92af (resolve rebase conflics)
  password: config.databasePassword,
  database: config.userDBName,
  port: config.portname,
});

module.exports = db;

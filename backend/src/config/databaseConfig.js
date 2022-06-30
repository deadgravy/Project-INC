const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'firc_v3',
  password: 'root',
  port: 5432,
});

module.exports = db;

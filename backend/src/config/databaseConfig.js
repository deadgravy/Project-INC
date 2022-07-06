const { Pool } = require('pg');

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'FIRC_v3',
  password: 'postgres',
  port: 5432,
});

module.exports = db;

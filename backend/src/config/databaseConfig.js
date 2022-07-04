const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "FIRC",
  password: "adeeb1234",
  port: 5432,
});

module.exports = db;

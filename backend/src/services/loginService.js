const pool = require("../config/databaseConfig")

// const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
module.exports.verify = async function () {

  client.connect();
  try {
    const { rows } = await client.query(``);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const { Client } = require("pg");


// const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
module.exports.verify = async function (email) {
    const client = new Client({
      host: "localhost",
      user: "postgres",
      port: 5432,
      password: "root",
      database: "user_management",
    });
  
    client.connect();
    console.log('Connected!')
    try {
      const { rows } =
        await client.query(`
        SELECT
          u.user_id,
          u.email,
          u.first_name,
          u.last_name
        FROM
            public."user" u
        WHERE
          u.user_id = $1`, [email]); // end of sql query
      return rows;
    } catch (error) {
      console.log(error);
    }
  };
  

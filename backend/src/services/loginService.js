const client = require('../config/userDatabase');

// const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
module.exports.verify = async function (email) {
  client.connect();
  console.log('Connected!');
  try {
    const { rows } = await client.query(
      `
        SELECT
          u.user_id,
          u.email,
          u.first_name,
          u.last_name,
          a.password_hash
        FROM
          public."user" u,
          public.account a
        WHERE
          u.user_id = a.user_id 
          AND u.email = $1`, // end of sql query
      [email]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

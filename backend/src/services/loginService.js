const pool = require('../config/userDatabase');

module.exports.verify = async function (email) {
  try {
    const { rows } = await pool.query(
      `SELECT
          u.user_id,
          u.email,
          u.first_name,
          u.last_name,
          a.role,
          a.password_hash
        FROM
          public."user" u,
          public.account a
        WHERE
          u.user_id = a.user_id 
          AND u.email = $1
    `,
      [email]
    );
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const pool = require('../config/userDatabase');

module.exports.addUser = async function (
  email,
  contact_number,
  first_name,
  last_name,
  password_hash
) {
  try {
    const { rows } = await pool.query(
      `WITH ins1 AS (
            INSERT INTO public."user"(email, contact_number, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id AS sample_id
            )
         INSERT INTO public.account(user_id, password_hash)
         SELECT sample_id, $5 FROM ins1;`,
      [email, contact_number, first_name, last_name, password_hash]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllUsers = async function () {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM public."user" ORDER BY user_id ASC`
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

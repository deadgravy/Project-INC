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
         INSERT INTO public.account(user_id, password_hash, role)
         SELECT sample_id, $5, 'user' FROM ins1;`,
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
      `SELECT 
        u.user_id, u.email, u.contact_number, u.first_name, u.last_name,
        a.role
        FROM public."user" u, public.account a
        WHERE u.user_id = a.user_id
        ORDER BY user_id;
     `
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteUserByID = async function (id) {
  try {
    const { rows } = await pool.query(
      `WITH ins1 AS (
	      DELETE FROM public."account" WHERE user_id = $1
      )
      DELETE FROM public."user" WHERE user_id = $1`,
      [id]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateUserByID = async function (id, requestBody) {
  try {
    const { rows } = await pool.query(
      `
      UPDATE
        public.user
      SET
        email = $1,
        contact_number = $2,
        first_name = $3,
        last_name = $4
      WHERE
        user_id = $5`,
      [
        requestBody.email,
        requestBody.phone,
        requestBody.firstName,
        requestBody.lastName,
        id,
      ]
    );

    return rows;
  } catch (error) {
    console.log(error);
  }
};

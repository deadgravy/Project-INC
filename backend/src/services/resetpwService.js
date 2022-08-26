const Pool = require('../config/userDatabase');

module.exports.getUserIDbyEmail = async function (email) {
  try {
    const { rows } = await Pool.query(
      `WITH GETID as (
        SELECT public."user".user_id as user_id, public."user".email, public."account".password_hash
        FROM public."user"
        INNER JOIN public."account"
        ON public."user".user_id = public.account.user_id
        )
        
        SELECT user_id FROM GETID WHERE email = $1`,
      [email]
    ); // end of query;
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports.changePWbyID = async function (password, email) {
  try {

    const result = await Pool.query(
      `WITH GETID as (
        SELECT public."user".user_id as user_id, public."user".email, public."account".password_hash
        FROM public."user"
        INNER JOIN public."account"
        ON public."user".user_id = public.account.user_id
        )
        
        SELECT user_id FROM GETID WHERE email = $1`,
      [email]
    );
    console.log("somehthingL ", result.rows[0].user_id)

    const { rows } = await Pool.query(
      `UPDATE account SET password_hash = $1 WHERE user_id = $2;`,
      [password, result.rows[0].user_id]
    ); // end of query;
    return rows;
  } catch (error) {
    console.log(error);
  }
};
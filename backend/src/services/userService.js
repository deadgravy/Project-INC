const { Client } = require("pg");


// const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
module.exports.addUser = async function (email, contact_number, first_name, last_name, password_hash) {
    const client = new Client({
      host: 'localhost',
      user: 'postgres',
      port: 5432,
      password: 'root',
      database: 'user_management',
    });
  
    client.connect();
    console.log('Connected!')
    try {
        client.query(`
        WITH ins1 AS (
            INSERT INTO public."user"(email, contact_number, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id AS sample_id
            )
         INSERT INTO public.account(user_id, password_hash)
         SELECT sample_id, $5 FROM ins1;`, // end of sql query
         [email, contact_number, first_name, last_name, password_hash], (err, results) => {
            if(err){
                console.log(err);
            } else {
                console.log(results);
                console.log(results.rows)            
            }
         }); 
    } catch (error) {
      console.log(error);
    }
  };


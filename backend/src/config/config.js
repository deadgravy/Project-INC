const dotenv = require('dotenv');
dotenv.config(); //Build the process.env object.
module.exports = {
  databaseUsername: process.env.DB_USERNAME,
  databasePassword: process.env.DB_PASSWORD,
  databaseName: process.env.DB_DATABASE_NAME,
  userDBName: process.env.DB_USERDB_NAME,

  JWTKey: process.env.JWTKEY,
};

const jwt = require('jsonwebtoken');
const config = require('../config/config');
const loginService = require('../services/loginService');
const bcrypt = require('bcrypt');

module.exports.verify = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const results = await loginService.verify(email);

    if (bcrypt.compareSync(password, results[0].password_hash)) {
      console.log('it matches');
      let data = {
        displayName: results[0].first_name + ' ' + results[0].last_name,
        email: results[0].email,
        role: results[0].role,
        token: jwt.sign(
          {
            userId: results[0].user_id,
            email: results[0].email,
          },
          config.JWTKey,
          {
            expiresIn: 3 * 60, //Expires in 3 mins
          }
        ),
      };
      return res.status(200).send(data);
    } else {
      console.log('invalid password');
      res.status(401).json({
        status: 'Invalid email or password!',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)

const resetpw = require('../services/resetpwService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getUserIDbyEmail = async function (req, res, next) {
  let email = req.params.email;
  try {
    const results = await resetpw.getUserIDbyEmail(email);
   
    console.log(results);
    res.status(200).json({
      status: 'success',
      data: results,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)

module.exports.changePWbyID = async function (req, res) {
  try {
    console.log(req.body);
    const { password, id } = req.body;
    console.log('password: ', password)
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // returns hash
        console.log(hash);

        let data = { hash, id };
        resetpw.changePWbyID(hash, id);
        console.log(data);
      });
    });

    // response for duplicate entry not done

    res.status(201).json({
      status: 'Password Changed successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)
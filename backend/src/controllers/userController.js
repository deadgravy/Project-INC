const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.addUser = async function (req, res) {
  try {
    const { email, contact_number, first_name, last_name, password } = req.body;
    console.log(0);

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        // returns hash
        console.log(hash);

        let data = { email, contact_number, first_name, last_name, hash };
        userService.addUser(email, contact_number, first_name, last_name, hash);
        console.log(data);
      });
    });

    // response for duplicate entry not done

    res.status(201).json({
      status: 'User added successfully!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)

module.exports.getAllUsers = async function (req, res, next) {
  try {
    const results = await userService.getAllUsers();
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

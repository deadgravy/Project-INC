const jwt = require("jsonwebtoken");
const config = require('../config/databaseConfig');
const loginService = require('../services/loginService');
const bcrypt = require('bcrypt')

module.exports.verify = async function (req, res, next) {

    try {
        const { email, password } = req.body;
        const results = await loginService.verify(email);

        if(bcrypt.compareSync(password, results[0].password_hash)){
            console.log('it matches');
            res.status(200).json({
                status: 'successfully logged in',
                userId: results[0].user_id,
                user: results[0].first_name
            })
        } else {
            console.log('invalid password');
             res.status(401).json({
                status: 'Invalid email or password!'
            })

        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            data: null
        });

    }

} // End of async function(req,res,next)

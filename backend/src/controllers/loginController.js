const jwt = require("jsonwebtoken");
const config = require('../config/databaseConfig');
const loginService = require('../services/loginService')

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//     // Store hash in your password DB.
// });});


module.exports.verify = async function (req, res, next) {

    try {
        const { email, password } = req.body;
        const results = await loginService.verify(email, password);
        console.log('pls work');
        console.log(results);
        console.log('it worked!');

        res.status(200).json({
            status: 'success',
            data: results
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: 'fail',
            data: null
        });

    }

} // End of async function(req,res,next)


// module.exports.verify = async(req, res, next) => {
//     try{
//         let email = req.body.email
//         let results = loginService.verify(email);

//         console.log(results[0])


//     } catch (error) {
//         console.log(error)
//     }
// }

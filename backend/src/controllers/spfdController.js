const itzy = require('../services/spfdService');
// Still in progress

module.exports.getSingleProductbyRecipeID = async function (req, res, next) {
  console.log(req.params);
  try {
    const results = await itzy.getSingleProductbyRecipeID(req.params.id);
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

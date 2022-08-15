const tpdManager = require('../services/tpdService');

module.exports.getCompletedProducts = async function (req, res, next) {
  try {
    const results = await tpdManager.getCompletedProducts(
      req.params.date
    );
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

// module.exports.getCompletedProducts = async function (req, res, next) {
//     try {
//       const results = await tpdManager.getCompletedProducts(req.params.date);
//       console.log(results);
//       res.status(200).json({
//         status: 'success',
//         data: results,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         status: 'fail',
//         data: null,
//       });
//     }
//   }; // End of async function(req,res,next)
  
  module.exports.getProductsToComplete = async function (req, res, next) {
    try {
      const results = await tpdManager.getProductsToComplete(req.params.date);
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
  
  module.exports.getSingleEquipmentStatus = async function (req, res, next) {
    try {
      const results = await tpdManager.getSingleEquipmentStatus(req.params.date);
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
  
  module.exports.getMultiEquipmentStatus = async function (req, res, next) {
    try {
      const results = await tpdManager.getMultiEquipmentStatus(req.params.date);
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
const itzy = require('../services/spfdService');
// Still in progress

module.exports.getSingleProductWithNameDate = async function (req, res, next) {
  let name = req.params.name;
  let startDate = req.params.startDate;
  let endDate = req.params.endDate
  try {
    const results = await itzy.getSingleProductWithNameDate(name, startDate, endDate);
    
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


module.exports.getAllRecipeName = async function (req, res, next) {
  try {
    const results = await itzy.getAllRecipeName();
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

module.exports.getSingleProductEquipment = async function (req, res, next) {
  let name = req.params.name;
  let startDate = req.params.startDate;
  let endDate = req.params.endDate
  try {
    const results = await itzy.getSingleProductEquipment(name, startDate, endDate);
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

module.exports.getEquipmentUsageByName = async function (req, res, next) {
  let name = req.params.name;
  let ename = req.params.ename;
<<<<<<< HEAD
<<<<<<< HEAD
  let startDate = req.params.startDate;
  let endDate = req.params.endDate;
  
  try {
    const results = await itzy.getEquipmentUsageByName(name, ename, startDate, endDate);
=======
  try {
    const results = await itzy.getEquipmentUsageByName(name, ename);
>>>>>>> 8fc1839e (somehow got the ganttchart working but is still hard coded)
=======
  let startDate = req.params.startDate;
  let endDate = req.params.endDate;
  
  try {
    const results = await itzy.getEquipmentUsageByName(name, ename, startDate, endDate);
>>>>>>> 9a1e1323ce26410ff797164eca61b08a54a81865
    
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
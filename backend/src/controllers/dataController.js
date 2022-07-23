const dataManager = require('../services/dataService');

module.exports.createTeamAndTeamMemberData = async function (req, res, next) {
  //console.log(req.headers['content-type']);
  console.log(req.body); //Inspect whether the express-form-data is working
  const data = req.body;
  try {
    const results = await dataManager.createTeamAndTeamMemberData(data);
    console.log(results.data.teamId);
    res.status(201).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)

module.exports.getData1 = async function (req, res, next) {
  try {
    const results = await dataManager.getData1();
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
//

module.exports.getRecipebyRecipeID = async function (req, res, next) {
  console.log(req.params);

  try {
    const results = await dataManager.getRecipebyRecipeID(req.params.id);
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

module.exports.getCompletedProducts = async function (req, res, next) {
  try {
    const results = await dataManager.getCompletedProducts();
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

module.exports.getProductsToComplete = async function (req, res, next) {
  try {
    const results = await dataManager.getProductsToComplete();
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

module.exports.getEquipmentStatus = async function (req, res, next) {
  try {
    const results = await dataManager.getEquipmentStatus();
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

module.exports.getMachineConnectivity = async function (req, res, next) {
  try {
    const results = await dataManager.getMachineConnectivity();
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
};

module.exports.getMachines = async function (req, res, next) {
  try {
    const results = await dataManager.getMachines();
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
};

module.exports.prodCount = async function (req, res, next) {
  try {
    const results = await dataManager.prodCount();
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
};

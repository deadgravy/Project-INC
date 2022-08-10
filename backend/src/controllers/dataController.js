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

module.exports.getSingleEquipmentStatus = async function (req, res, next) {
  try {
    const results = await dataManager.getSingleEquipmentStatus();
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
    const results = await dataManager.getMultiEquipmentStatus();
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

module.exports.getAllEquipments = async function (req, res, next) {
  try {
    const results = await dataManager.getAllEquipments();
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

module.exports.getEquipmentStartOrStopCount = async function (req, res, next) {
  try {
    const results = await dataManager.getStartOfEquipment(
      req.body.start + ' 00:00:00',
      req.body.end + ' 23:59:59',
      req.body.startOrStop,
      req.body.equipmentid,
      req.body.totalDataLength
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
};

module.exports.getAllEquipmentStartOrStopCount = async function (req, res, next) {
  try {
    console.log(req.body.start)
    const results = await dataManager.getAllEquipmentStartOrStop(
      req.body.start + ' 00:00:00',
      req.body.end + ' 23:59:59',
      req.body.startOrStop
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
};

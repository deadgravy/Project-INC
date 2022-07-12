// const { data } = require('../../../frontend/src/components/eud/UsageChart');
const eudManager = require('../services/eudService');

module.exports.getSingleUsage = async function (req, res, next) {
  try {
    const results = await eudManager.getSingleUsage();
    console.log(results);
    const dataArr = [];

    for (let i = 0; i < results.length; i++) {
      dataArr.push(Object.values(results[i]));
    }
    res.status(200).json({
      status: 'success',
      data: dataArr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)

module.exports.getMultipleUsage = async function (req, res, next) {
  try {
    const results = await eudManager.getMultipleUsage();
    console.log(results);
    const dataArr = [];

    for (let i = 0; i < results.length; i++) {
      dataArr.push(Object.values(results[i]));
    }
    res.status(200).json({
      status: 'success',
      data: dataArr,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      data: null,
    });
  }
}; // End of async function(req,res,next)

const eudManager = require('../services/eudService');

module.exports.getSingleUsage = async function (req, res, next) {
  try {
    const results = await eudManager.getSingleUsage(req.params.date);
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

module.exports.getMultipleUsage = async function (req, res, next) {
  try {
    const results = await eudManager.getMultipleUsage(req.params.date);
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

module.exports.getSingleUsageDetails = async function (req, res, next) {
  let date = req.params.date;
  let hour = req.params.hour;
  try {
    const results = await eudManager.getSingleUsageDetails(date, hour);

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].duration;
      for (let x = 0; x < Object.keys(time).length; x++) {
        if (time.hours.toString().length === 1) {
          time.hours = `0${time.hours}`;
        } else if (time.minutes.toString().length === 1) {
          time.minutes = `0${time.minutes}`;
        } else if (time.seconds.toString().length === 1) {
          time.seconds = `0${time.seconds}`;
        }
      }
    }
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

module.exports.getMultipleUsageDetails = async function (req, res, next) {
  let date = req.params.date;
  let hour = req.params.hour;

  try {
    const results = await eudManager.getMultipleUsageDetails(date, hour);

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].duration;
      for (let x = 0; x < Object.keys(time).length; x++) {
        if (time.hours.toString().length === 1) {
          time.hours = `0${time.hours}`;
        } else if (time.minutes.toString().length === 1) {
          time.minutes = `0${time.minutes}`;
        } else if (time.seconds.toString().length === 1) {
          time.seconds = `0${time.seconds}`;
        }
      }
    }
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

const eudManager = require('../services/eudService');

module.exports.getSingleUsage = async function (req, res, next) {
  try {
    const results = await eudManager.getSingleUsage(
      req.params.startdate,
      req.params.enddate
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

module.exports.getMultipleUsage = async function (req, res, next) {
  try {
    const results = await eudManager.getMultipleUsage(
      req.params.startdate,
      req.params.enddate
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

module.exports.getSingleUsageDetails = async function (req, res, next) {
  let startdate = req.params.startdate;
  let enddate = req.params.enddate;
  let hour = req.params.hour;
  try {
    const results = await eudManager.getSingleUsageDetails(
      startdate,
      enddate,
      hour
    );

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].duration;
      for (let x = 0; x < Object.keys(time).length; x++) {
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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
  let startdate = req.params.startdate;
  let enddate = req.params.enddate;
  let hour = req.params.hour;

  try {
    const results = await eudManager.getMultipleUsageDetails(
      startdate,
      enddate,
      hour
    );

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].duration;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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

module.exports.getSingleEquipmentLeftUnused = async function (req, res, next) {
  try {
    const results = await eudManager.getSingleEquipmentLeftUnused(
      req.params.startdate,
      req.params.enddate,
      req.params.hour
    );

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].difference;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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

module.exports.getMultipleEquipmentLeftUnused = async function (
  req,
  res,
  next
) {
  try {
    const results = await eudManager.getMultipleEquipmentLeftUnused(
      req.params.startdate,
      req.params.enddate,
      req.params.hour
    );

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].difference;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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

// weekly

module.exports.getSingleWeekly = async function (req, res, next) {
  let startdate = req.params.startdate;
  let enddate = req.params.enddate;
  try {
    const results = await eudManager.getSingleWeekly(startdate, enddate);
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
module.exports.getMultipleWeekly = async function (req, res, next) {
  let startdate = req.params.startdate;
  let enddate = req.params.enddate;
  try {
    const results = await eudManager.getMultipleWeekly(startdate, enddate);
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

module.exports.getSingleWeeklyDetails = async function (req, res, next) {
  let startdate = req.params.startdate;
  let enddate = req.params.enddate;
  let hour = req.params.hour;
  try {
    const results = await eudManager.getSingleWeeklyDetails(
      startdate,
      enddate,
      hour
    );
    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].duration;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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
module.exports.getMultipleWeeklyDetails = async function (req, res, next) {
  let startdate = req.params.startdate;
  let enddate = req.params.enddate;
  let hour = req.params.hour;
  try {
    const results = await eudManager.getMultipleWeeklyDetails(
      startdate,
      enddate,
      hour
    );
    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].duration;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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

module.exports.getSingleUnusedWeekly = async function (req, res, next) {
  try {
    const results = await eudManager.getSingleUnusedWeekly(
      req.params.startdate,
      req.params.enddate,
      req.params.hour
    );

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].difference;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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

module.exports.getMultipleUnusedWeekly = async function (req, res, next) {
  try {
    const results = await eudManager.getMultipleUnusedWeekly(
      req.params.startdate,
      req.params.enddate,
      req.params.hour
    );

    // add extra 0 if hours/minutes/seconds is single digit
    for (let i = 0; i < results.length; i++) {
      let time = results[i].difference;
      for (let x = 0; x < Object.keys(time).length; x++) {
        // if for eg, time taken is 01:00:32, minutes will return undefined
        // line 85 to 90 makes it such that it returns 00
        if (time.hours === undefined) {
          time.hours = `00`;
        } else if (time.minutes === undefined) {
          time.minutes = `00`;
        } else if (time.seconds === undefined) {
          time.seconds = `00`;
        } else if (time.hours.toString().length === 1) {
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

module.exports.getAllEquipment = async function (req, res, next) {
  try {
    const results = await eudManager.getAllEquipment();
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

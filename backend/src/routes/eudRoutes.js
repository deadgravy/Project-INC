const express = require('express');
const router = express.Router();
router.use(express.json());

const eudController = require('../controllers/eudController');

// getting single recipe equipment usage (eud)
router.get('/getSingleUsage/:startdate/:enddate', eudController.getSingleUsage);

// getting multiple recipe equipment usage (eud)
router.get(
  '/getMultipleUsage/:startdate/:enddate',
  eudController.getMultipleUsage
);

// getting single recipe equipment usage details (eud)
router.get(
  '/getSingleUsageDetails/:startdate/:enddate/:hour',
  eudController.getSingleUsageDetails
);

// getting multiple recipe equipment usage details (eud)
router.get(
  '/getMultipleUsageDetails/:startdate/:enddate/:hour',
  eudController.getMultipleUsageDetails
);

// WEEKLY
// get weekly usage for single recipe equipment
router.get(
  '/getSingleUsageWeekly/:startdate/:enddate',
  eudController.getSingleWeekly
);

// get weekly usage for multiple recipe equipment
router.get(
  '/getMultipleUsageWeekly/:startdate/:enddate',
  eudController.getMultipleWeekly
);

// get weekly usage details  for single recipe equipment
router.get(
  '/getSingleUsageDetailsWeekly/:startdate/:enddate/:hour',
  eudController.getSingleWeeklyDetails
);

// get weekly usage details for multiple recipe equipment
router.get(
  '/getMultipleUsageDetailsWeekly/:startdate/:enddate/:hour',
  eudController.getMultipleWeeklyDetails
);

module.exports = router;

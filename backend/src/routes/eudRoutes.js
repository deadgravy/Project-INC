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

// getting single recipe equipment unused details (eud)
router.get(
  '/getSingleUnusedDetails/:startdate/:enddate/:hour',
  eudController.getSingleEquipmentLeftUnused
);

// getting multiple recipe equipment unused details (eud)
router.get(
  '/getMultipleUnusedDetails/:startdate/:enddate/:hour',
  eudController.getMultipleEquipmentLeftUnused
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

// getting single recipe equipment unused details WEEKLY (eud)
router.get(
  '/getSingleUnusedWeekly/:startdate/:enddate/:hour',
  eudController.getSingleUnusedWeekly
);

// getting multiple recipe equipment unused details WEEKLY (eud)
router.get(
  '/getMultipleUnusedWeekly/:startdate/:enddate/:hour',
  eudController.getMultipleUnusedWeekly
);

module.exports = router;

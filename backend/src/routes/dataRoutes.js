const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const spfdController = require('../controllers/spfdController');
const eudController = require('../controllers/eudController');

router.get('/data/data1', dataController.getData1);

// getting recipe by ID
// router.get('/data/data2', dataController.getRecipebyRecipeID);
router.get('/data/data2/:id', dataController.getRecipebyRecipeID);

// login
router.post('/login', loginController.verify);

// add user
router.post('/addUser', userController.addUser);

//getting completed products
router.get('/getCompletedProducts', dataController.getCompletedProducts);

// getting products to complete
router.get('/getProductsToComplete', dataController.getProductsToComplete);

// getting equipment status
router.get('/getEquipmentStatus', dataController.getEquipmentStatus);

// getting machine connectivity (eus)
router.get('/machineConnectivity', dataController.getMachineConnectivity);

// getting machines (eus)
router.get('/machines', dataController.getMachines);

// getting single product by recipe id
router.get(
  '/getSingleProductWithNameDate/:name/:startDate/:endDate',
  spfdController.getSingleProductWithNameDate
);

// getting single recipe equipment usage
router.get('/getSingleUsage/:startdate/:enddate', eudController.getSingleUsage);

// getting multiple recipe equipment usage
router.get(
  '/getMultipleUsage/:startdate/:enddate',
  eudController.getMultipleUsage
);

router.get('/prodCount', dataController.prodCount);

// getting single recipe equipment usage details
router.get(
  '/getSingleUsageDetails/:startdate/:enddate/:hour',
  eudController.getSingleUsageDetails
);

// getting multiple recipe equipment usage details
router.get(
  '/getMultipleUsageDetails/:startdate/:enddate/:hour',
  eudController.getMultipleUsageDetails
);

// getting the name of all recipes
router.get('/getAllRecipeName', spfdController.getAllRecipeName);

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

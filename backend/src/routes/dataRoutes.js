const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const spfdController = require('../controllers/spfdController');
const eudController = require('../controllers/eudController');

// get all recipes and ID
router.get('/getAllRecipeAndID', dataController.getData1);

// getting recipe by ID
// router.get('/data/data2', dataController.getRecipebyRecipeID);
router.get('/getRecipesById/:id', dataController.getRecipebyRecipeID);

// login
router.post('/login', loginController.verify);

// add user
router.post('/addUser', userController.addUser);

//getting completed products
router.get('/getCompletedProducts', dataController.getCompletedProducts);

// getting products to complete
router.get('/getProductsToComplete', dataController.getProductsToComplete);

//getting single equipment status
router.get('/getSingleEquipmentStatus', dataController.getSingleEquipmentStatus);

//getting multi equipment status
router.get('/getMultiEquipmentStatus', dataController.getMultiEquipmentStatus);

// getting machine connectivity (eus)
router.get('/machineConnectivity', dataController.getMachineConnectivity);

// getting machines (eus)
router.get('/machines', dataController.getMachines);

// getting single product by recipe Name
router.get(
  '/getSingleProductWithNameDate/:startDate/:endDate/:name',
  spfdController.getSingleProductWithNameDate
);

// getting single recipe equipment usage (eud)
router.get('/getSingleUsage/:startdate/:enddate', eudController.getSingleUsage);

// getting multiple recipe equipment usage (eud)
router.get(
  '/getMultipleUsage/:startdate/:enddate',
  eudController.getMultipleUsage
);

router.get('/prodCount', dataController.prodCount);

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

// Getting all equipments from log times table
router.get('/getAllEquipments', dataController.getAllEquipments);

// Getting start / stop count of specific equipment
router.post('/getEquipmentStartOrStopCount', dataController.getEquipmentStartOrStopCount)

router.post('/getAllEquipmentStartOrStop', dataController.getAllEquipmentStartOrStopCount)

router.post('/getAnomolies', dataController.getAnomolies)

module.exports = router;
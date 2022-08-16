const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const spfdController = require('../controllers/spfdController');
const eudController = require('../controllers/eudController');
const tpdController = require('../controllers/tpdController');

// get all recipes and ID
router.get('/getAllRecipeAndID', dataController.getData1);

// getting recipe by ID
// router.get('/data/data2', dataController.getRecipebyRecipeID);
router.get('/getRecipesById/:id', dataController.getRecipebyRecipeID);

// login
router.post('/login', loginController.verify);

// add user
router.post('/addUser', userController.addUser);

//=================================================================================

//getting completed products
router.get('/getCompletedProducts/:date', tpdController.getCompletedProducts);

// getting products to complete
router.get('/getProductsToComplete/:date', tpdController.getProductsToComplete);

//getting single equipment status
router.get('/getSingleEquipmentStatus/:date', tpdController.getSingleEquipmentStatus);

//getting multi equipment status
router.get('/getMultiEquipmentStatus/:date', tpdController.getMultiEquipmentStatus);

//==================================================================================

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

router.get('/prodCount/:startDate/:endDate', dataController.prodCount);

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

// getting the equipment name for single product
router.get(
  '/getSingleProductEquipment/:startDate/:endDate/:name',
  spfdController.getSingleProductEquipment
);

// getting the equipment usage by name for single product
router.get(
  '/getEquipmentUsageByName/:name/:ename/:startDate/:endDate',
  spfdController.getEquipmentUsageByName
);

// get all equipment
router.get('/getAllEquipment', eudController.getAllEquipment);

module.exports = router;

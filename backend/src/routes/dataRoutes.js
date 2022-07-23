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
router.get(
  '/getSingleEquipmentStatus/:date',
  tpdController.getSingleEquipmentStatus
);

//getting multi equipment status
router.get(
  '/getMultiEquipmentStatus/:date',
  tpdController.getMultiEquipmentStatus
);

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

router.get('/prodCount', dataController.prodCount);
// getting single recipe equipment usage details
router.get(
  '/getSingleUsageDetails/:date/:hour',
  eudController.getSingleUsageDetails
);

// getting multiple recipe equipment usage details
router.get(
  '/getMultipleUsageDetails/:date/:hour',
  eudController.getMultipleUsageDetails
);

// getting the name of all recipes (eud)
router.get('/getAllRecipeName', spfdController.getAllRecipeName);

// Getting all equipments from log times table
router.get('/getAllEquipments', dataController.getAllEquipments);

// Getting start / stop count of specific equipment
router.post(
  '/getEquipmentStartOrStopCount',
  dataController.getEquipmentStartOrStopCount
);

router.post(
  '/getAllEquipmentStartOrStop',
  dataController.getAllEquipmentStartOrStopCount
);

// get all equipment
router.get('/getAllEquipment', eudController.getAllEquipment);

router.post('/getAnomolies', dataController.getAnomolies);

module.exports = router;

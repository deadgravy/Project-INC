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

router.get('/prodCount/:startDate/:endDate', dataController.prodCount);

// getting the name of all recipes
router.get('/getAllRecipeName', spfdController.getAllRecipeName);

// getting the equipment name for single product
router.get(
  '/getSingleProductEquipment/:startDate/:endDate/:name',
  spfdController.getSingleProductEquipment
);

// getting the equipment usage by name for single product
router.get(
  '/getEquipmentUsageByName/:name/:ename',
  spfdController.getEquipmentUsageByName
);
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

router.post('/getAnomolies', dataController.getAnomolies);

router.get('/getAllUsers', userController.getAllUsers);

module.exports = router;

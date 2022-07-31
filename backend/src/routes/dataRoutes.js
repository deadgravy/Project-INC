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

// getting single recipe equipment usage
router.get('/getSingleUsage/:date', eudController.getSingleUsage);

// getting multiple recipe equipment usage
router.get(
  '/getMultipleUsage/:startdate/:enddate',
  eudController.getMultipleUsage
);

//getting single equipment status
router.get('/getSingleEquipmentStatus', dataController.getSingleEquipmentStatus);

//getting multi equipment status
router.get('/getMultiEquipmentStatus', dataController.getMultiEquipmentStatus);

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
router.get('/getSingleUsage/:date', eudController.getSingleUsage);

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
router.get(
  '/getAllRecipeName',
  spfdController.getAllRecipeName
);

module.exports = router;

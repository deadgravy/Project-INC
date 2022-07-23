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

//getting products to complete
router.get('/getProductsToComplete', dataController.getProductsToComplete);

//getting single recipe equipment usage
router.get('/getSingleUsage/:date', eudController.getSingleUsage);

// getting multiple recipe equipment usage
router.get('/getMultipleUsage/:date', eudController.getMultipleUsage);

//getting equipment status
router.get('/getEquipmentStatus', dataController.getEquipmentStatus);

//getting machine connectivity (eus)
router.get('/machineConnectivity', dataController.getMachineConnectivity);

//getting machines (eus)
router.get('/machines', dataController.getMachines);

//getting single product by recipe id
router.get(
  '/getSingleProductbyRecipeID/:id',
  spfdController.getSingleProductbyRecipeID
);

//getting single recipe equipment usage
router.get('/getSingleUsage/:date', eudController.getSingleUsage);

// getting multiple recipe equipment usage
router.get('/getMultipleUsage/:date', eudController.getMultipleUsage);

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

module.exports = router;

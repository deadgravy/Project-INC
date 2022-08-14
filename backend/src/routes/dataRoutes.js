const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const spfdController = require('../controllers/spfdController');

// get all recipes and ID
<<<<<<< HEAD
router.get('/getAllRecipeAndID', dataController.getData1);
=======
router.get('/getAllRecipe', dataController.getData1);
>>>>>>> 8815b3dc (fixing data1 endpoint for api documentation)

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
router.get(
  '/getSingleEquipmentStatus',
  dataController.getSingleEquipmentStatus
);

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

router.get('/prodCount', dataController.prodCount);

// getting the name of all recipes
router.get('/getAllRecipeName', spfdController.getAllRecipeName);

// Getting all equipments from log times table
router.get('/getAllEquipments', dataController.getAllEquipments);

// Getting start / stop count of specific equipment (eud)
router.post(
  '/getEquipmentStartOrStopCount',
  dataController.getEquipmentStartOrStopCount
);

router.post(
  '/getAllEquipmentStartOrStop',
  dataController.getAllEquipmentStartOrStopCount
);

router.post('/getAnomolies', dataController.getAnomolies);

router.post('/getAnomolies', dataController.getAnomolies);

module.exports = router;

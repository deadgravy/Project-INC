const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const spfdController = require('../controllers/spfdController');

// get all recipes and ID
<<<<<<< HEAD
<<<<<<< HEAD
router.get('/getAllRecipeAndID', dataController.getData1);
=======
router.get('/getAllRecipe', dataController.getData1);
>>>>>>> 8815b3dc (fixing data1 endpoint for api documentation)
=======
router.get('/getAllRecipeAndID', dataController.getData1);
>>>>>>> b3c7bd23 (fixing data2 endpoint for api documentation)

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

<<<<<<< HEAD
router.get('/prodCount', dataController.prodCount);
=======
// getting single recipe equipment usage (eud)
router.get('/getSingleUsage/:startdate/:enddate', eudController.getSingleUsage);

// getting multiple recipe equipment usage (eud)
router.get(
  '/getMultipleUsage/:startdate/:enddate',
  eudController.getMultipleUsage
);

router.get('/prodCount/:startDate/:endDate', dataController.prodCount);
>>>>>>> 9c502b1a (date picker not working)

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

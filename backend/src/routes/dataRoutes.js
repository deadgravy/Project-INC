const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

router.get('/data/data1', dataController.getData1);

// getting recipe by ID
// router.get('/data/data2', dataController.getRecipebyRecipeID);
router.get('/data/data2/:id', dataController.getRecipebyRecipeID);

// login
router.post('/login', loginController.verify);

// add user
router.post('/addUser', userController.addUser)

//getting products completed
router.get('/getCompletedProducts', dataController.getCompletedProducts);

//getting products to complete
router.get('/getProductsToComplete', dataController.getProductsToComplete);

module.exports = router;

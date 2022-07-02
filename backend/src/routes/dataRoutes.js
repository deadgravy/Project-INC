const express = require('express');
const router = express.Router();
router.use(express.json())
const dataController = require('../controllers/dataController');
const userController = require('../controllers/userController')

router.get('/data/data1', dataController.getData1);

// getting recipe by ID
router.get('/data/data2', dataController.getRecipebyRecipeID);

// login
// router.get('/login', dataController.verify)

// add user
router.post('/adduser', userController.addUser)

module.exports = router;

const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');


router.get('/data/data1', dataController.getData1);

// getting recipe by ID
router.get('/data/data2', dataController.getRecipebyRecipeID); 

// login
// router.get('/login', dataController.verify)

module.exports = router;
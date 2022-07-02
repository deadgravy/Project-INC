const express = require('express');
const router = express.Router();
router.use(express.json());

const dataController = require('../controllers/dataController');
const loginController = require('../controllers/loginController');

router.get('/data/data1', dataController.getData1);

// getting recipe by ID
router.get('/data/data2', dataController.getRecipebyRecipeID);

// login
router.post('/login', loginController.verify);



module.exports = router;

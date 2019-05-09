var express = require('express');
var router = express.Router();
var MealsController = require('../../../controllers/meals_controller');

/* GET all meals */
router.get('/', MealsController.index);

module.exports = router;

var express = require('express');
var router = express.Router();

var FoodController = require('../../../controllers/food_controller')

/* GET single food item */
router.get('/:id', FoodController.show)


module.exports = router;

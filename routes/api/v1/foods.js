var express = require('express');
var router = express.Router();
var FoodController = require('../../../controllers/food_controller')

/* GET all food items */
router.get('/', FoodController.index);
/* GET single food item */
router.get('/:id', FoodController.show);
/* PATCH update single food item */
router.patch('/:id', FoodController.update)


module.exports = router;

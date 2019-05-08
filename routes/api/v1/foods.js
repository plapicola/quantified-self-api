var express = require('express');
var router = express.Router();
var FoodController = require('../../../controllers/food_controller')

/* GET all food items */
router.get('/', FoodController.index);
/* GET single food item */
router.get('/:id', FoodController.show);
/* POST new food item */
router.post('/', FoodController.create);


module.exports = router;

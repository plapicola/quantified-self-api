var express = require('express');
var router = express.Router();
var MealsController = require('../../../controllers/meals_controller');

/* GET all meals */
router.get('/', MealsController.index);
/* GET a single meal */
router.get('/:meal_id/foods', MealsController.show);
/* POST food item to a meal */
router.post('/:meal_id/foods/:id', MealsController.create)

module.exports = router;

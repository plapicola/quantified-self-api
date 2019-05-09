var express = require('express');
var router = express.Router();
var MealsController = require('../../../controllers/meals_controller');

/* GET all meals */
router.get('/', MealsController.index);
/* GET a single meal */
router.get('/:meal_id/foods', MealsController.show);
/* DELETE a food from a meal */
router.delete('/:meal_id/foods/:id', MealsController.destroy);

module.exports = router;

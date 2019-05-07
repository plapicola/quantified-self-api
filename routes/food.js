const express = require('express');
const router = express.Router();
const FoodController = require('../controllers/food_controller');

router.get('/', FoodController.index);

module.exports = router;

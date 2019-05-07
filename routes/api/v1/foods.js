var express = require('express');
var router = express.Router();

var food_controller = require('../../../controllers/food')

/* GET single food item */
router.get('/:id', food_controller)

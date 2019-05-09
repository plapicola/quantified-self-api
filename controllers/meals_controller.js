var Meal = require('../models').Meal;
var MealSerializer = require('../serializers/meal_serializer');
var MealAddFoodFacade = require('../facades/meal_add_food_facade');

module.exports = class MealsController {
  static index(request, response) {
    response.setHeader("Content-Type", "application/json");
    Meal.findAll({
      include: 'food'
    })
    .then(meals => {
      response.status(200).send(MealSerializer.formatAll(meals))
    })
    .catch(error => {
      response.status(500).send(error)
    })
  }

  static show(request, response) {
    response.setHeader("Content-Type", "application/json");
    Meal.find(request.params.meal_id)
    .then(meal => {
      response.status(200).send(MealSerializer.formatOne(meal));
    })
    .catch(error => {
      response.status(404).send(error);
    })
  }

  static create(request, response) {
    response.setHeader("Content-Type", "application/json");
    MealAddFoodFacade.addFood(request.params)
    .then(response => {
      response.status(response.status).send(response.message)
    })
    .catch(error => {
      response.status(404).send(error)
    })
  }
}

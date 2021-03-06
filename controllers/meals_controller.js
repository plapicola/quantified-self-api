var Meal = require('../models').Meal;
var MealFood = require('../models').MealFood;
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
    .then(facade => {
      response.status(facade.status).send(facade.body)
    })
    .catch(error => {
      response.status(error.status).send(error.body)
    })
  }

  static destroy(request, response) {
    response.setHeader("Content-Type", "application/json");
    MealFood.destroyItem(request.params.meal_id, request.params.id)
    .then(mealFood => {
      response.status(204).send()
    })
    .catch(error => {
      response.status(404).send(error)
    })
  }
}

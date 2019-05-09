var Meal = require('../models').Meal;
var MealSerializer = require('../serializers/meal_serializer');

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

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
      console.log(error);
      response.status(500).send(error)
    })
  }
}

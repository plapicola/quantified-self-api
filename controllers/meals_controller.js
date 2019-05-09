var Meal = require('../models').Meal;

module.exports = class MealsController {
  static index(request, response) {
    response.setHeader("Content-Type", "application/json");
    Meal.findAll({
      include: 'food'
    })
    .then(meals => {
      response.status(200).send(meals)
    })
    .catch(error => {
      console.log(error);
      response.status(500).send(error)
    })
  }
}

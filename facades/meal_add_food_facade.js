var Food = require('../models').Food;
var Meal = require('../models').Meal;

module.exports = class MealAddFoodFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static addFood(params) {
    return new Promise(function(resolve, reject) {
      findMealAndFood(params)
      .then(meal => {
        }
      })
      .catch(() => reject({error: 'Meal not found.'}))
    })
  }

  function findMealAndFood(params) {
    var mealFood = {meal: null, food: null}
    return new Promise(function(resolve, reject) {
      Meal.findByPk(params.meal_id)
      .then(meal => {
        if (meal) {
          mealFood.meal = meal
          Food.findByPk(params.id)
          .then(food => {
            if (food) {
              mealFood.food = food
              resolve(mealFood)
            }
          })
          .catch(() => {})
        }
      })
      .catch(() => {})
    })
  }
}

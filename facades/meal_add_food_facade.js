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
      .then(mealAndFood => {
        var response = handleResponse(mealAndFood)
        if (response.status === 200){
          resolve(response)
        }
        else {
          reject(response)
        }
      })
      .catch(() => {})
    })
  }

  function findMealAndFood(params) {
    var mealFood = {meal: null, food: null}
    return new Promise(function(resolve, reject) {
      Meal.findByPk(params.meal_id)
      .then(meal => {
        mealFood.meal = meal
        Food.findByPk(params.id)
        .then(food => {
          mealFood.food = food
          resolve(mealFood)
        })
        .catch(() => {})
      })
      .catch(() => {})
    })
  }

  function handleResponse(object) {
    if (object.meal && object.food) {
      return {
        status: 200,
        message: {
          message: `Successfully added ${object.food} to ${object.meal}`
        }
      }
    } else if (object.meal) {
      return {status: 404, message: {error: 'Food not found.'}}
    } else if (object.food) {
      return {status: 404, message: {error: 'Meal not found.'}}
    } else {
      return {status: 404, message: {error: 'Meal and Food not found.'}}
    }
  }
}

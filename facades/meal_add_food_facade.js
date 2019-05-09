var Food = require('../models').Food;
var Meal = require('../models').Meal;
var MealFood = require('../models').MealFood;
var pry = require('pryjs')

module.exports = class MealAddFoodFacade {

  static addFood(params) {
    return new Promise(function(resolve, reject) {
      findMealAndFood(params)
      .then(mealAndFood => {
        handleResponse(mealAndFood)
        .then(response => {resolve(response)})
        .catch(error => {reject(error)})
      })
      .catch(() => {reject({status: 500, body: 'wtf'})})
    })
  }
}

function handleResponse(object) {
  return new Promise(function(resolve, reject){
    if (object.meal && object.food) {
      MealFood.create({
        MealId: object.meal.id,
        FoodId: object.food.id
      })
      .then(mealFood => {
        if (mealFood) {
          resolve({status: 200, body: {message: `Successfully added ${object.food.name} to ${object.meal.name}`}})
        } else {
          reject({status: 500, body: {error: 'Food was not added to Meal.'}})
        }
      })
      .catch(() => {})
    } else if (object.meal) {
      reject({status: 404, body: {error: 'Food not found.'}})
    } else if (object.food) {
      reject({status: 404, body: {error: 'Meal not found.'}})
    } else {
      reject({status: 404, body: {error: 'Meal and Food not found.'}})
    }
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
      .catch(() => {reject()})
    })
    .catch(() => {reject()})
  })
}

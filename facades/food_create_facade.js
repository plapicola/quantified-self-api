var Food = require('../models').Food;
var FoodSerializer = require('../serializers/food_serializer');

module.exports = class FoodCreateFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static createFood(foodParams) {
    return new Promise((resolve, reject) => {
      if (foodParams && foodParams.name && foodParams.calories) {
        Food.findOrCreate({where: foodParams})
        .then(([food]) => {
          resolve(new FoodCreateFacade(201, FoodSerializer.formatOne(food)))
        })
        .catch(error => {
          reject(new FoodCreateFacade(400, error))
        })
      } else {
        reject(new FoodCreateFacade(400, handleRejection(foodParams)))
      }
    })
  }
}

function handleRejection(foodParams) {
  if (foodParams === undefined) {
    return {error: "Invalid format"}
  } else if (foodParams.calories) {
    return {error: "Name is required"}
  } else {
    return {error: "Calories are required"}
  }
}

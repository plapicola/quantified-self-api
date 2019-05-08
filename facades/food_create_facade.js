var Food = require('../models').Food;
var FoodSerializer = require('../serializers/food_serializer');

module.exports = class FoodCreateFacade {
  constructor(status, body) {
    this.status = status
    this.body = body
  }

  static createFood(foodParams) {
    return new Promise((resolve, reject) => {
      if (foodParams) {
        if (foodParams.name && foodParams.calories) {
          Food.findOrCreate({where: foodParams})
          .then(([food]) => {
            resolve(new FoodCreateFacade(201, FoodSerializer.formatOne(food)))
          })
          .catch(error => {
            reject(new FoodCreateFacade(400, error))
          })
        } else if (foodParams.calories) {
          reject(new FoodCreateFacade(400, {error: "Name is required"}))
        } else {
          reject(new FoodCreateFacade(400, {error: "Calories are required"}))
        }
      } else {
        reject(new FoodCreateFacade(400, {error: "Invalid format"}))
      }
    })
  }
}

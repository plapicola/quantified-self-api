var FoodSerializer = require('./food_serializer');

module.exports = class MealSerializer {
  static formatOne(meal) {
    return {
      id: meal.id,
      name: meal.name,
      food: FoodSerializer.formatAll(meal.food)
    }
  }

  static formatAll(meals) {
    return meals.map(meal => {
      return MealSerializer.formatOne(meal)
    })
  }
}

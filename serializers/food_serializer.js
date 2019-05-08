module.exports = class FoodSerializer {
  static formatOne(food) {
    return {
      id: food.id,
      name: food.name,
      calories: food.calories
    }
  }

  static formatAll(foods) {
    return foods.map(function(food) {
      return FoodSerializer.formatOne(food)
    })
  }
}

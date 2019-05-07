module.exports = class FoodSerializer {
  static formatAll(foods) {
    return foods.map(function(food) {
      return {
        id: food.id,
        name: food.name,
        calories: food.calories
      }
    })
  }
}

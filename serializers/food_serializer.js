module.exports = class FoodSerializer {
  static formatAll(foods) {
    return foods.map(function(food) {
      return formatOne(food)
    })
  }

  static formatOne(food) {
    return {
      id: food.id,
      name: food.name,
      calories: food.calories
    }
  }
}

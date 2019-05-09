'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealFood = sequelize.define('MealFood', {
    MealId: DataTypes.INTEGER,
    FoodId: DataTypes.INTEGER
  }, {});
  MealFood.associate = function(models) {
    MealFood.belongsTo(models.Meal);
    MealFood.belongsTo(models.Food, {onDelete: 'cascade'});
  };

  MealFood.destroyItem = function(mealId, foodId) {
    return new Promise((resolve, reject) => {
      MealFood.findOne({
        where: {
          MealId: mealId,
          FoodId: foodId
        }
      })
      .then(mealFood => {
        mealFood ? mealFood.destroy() : reject({error: "Meal or Food not found"})
      })
      .then(result => {
        resolve()
      })
      .catch(error => {
        reject({error: "Meal or Food not found"})
      })
    })
  }
  return MealFood;
};

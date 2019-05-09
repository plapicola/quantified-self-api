'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    Meal.belongsToMany(models.Food, { through: models.MealFood, as: 'food' })
  };

  Meal.find = function(id) {
    return new Promise((resolve, reject) => {
      Meal.findByPk(id, {include: 'food'})
        .then(meal => {
          meal ? resolve(meal) : reject({error: "Meal not found"})
        })
        .catch(() => {
          reject({error: "Meal not found"})
        })
    })
  }
  return Meal;
};

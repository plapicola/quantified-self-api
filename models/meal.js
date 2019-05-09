'use strict';
var Food = require('../models').Food;

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

  Meal.addFood = function(params) {
    return new Promise(function(resolve, reject) {
      Meal.findByPk(params.meal_id)
      .then(meal => {
        if (meal) {
          Food.findByPk(params.id)
          .then(food => {
            if (food) {
              MealFood.create({
                MealId: meal.id,
                FoodId: food.id
              })
              .then(mealfood => {
                mealfood ? resolve({message: `Successfully added ${food.name} to ${meal.name}`}) : reject({error: "Food was not added to Meal."})
              })
              .catch(() => {
                reject({error: "Food was not added to Meal."})
              })
            }
            else {
              reject({error: "Food not found."})
            }
          })
          .catch(() => {
            reject({error: "Food not found."})
          })
        }
        else {
          reject({error: "Meal not found."})
        }
      })
      .catch(() => {
        reject({error: "Meal not found."})
      })
    })
  }
  return Meal;
};

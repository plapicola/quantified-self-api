'use strict';
var pry = require('pryjs')
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
  };

  Food.findItem = function(id) {
    return new Promise(function(resolve, reject) {
      Food.findByPk(id)
      .then(food => {
        food ? resolve(food) : reject({message: "Food not found."})
      })
    })
  }

  Food.updateItem = function(req) {
    return new Promise(function(resolve, reject) {
      var food = req.body
      if (food.name != undefined && food.calories != undefined){
        Food.update(
          {name: food.name,
          calories: food.calories},
          {returning: true,
          where: {id: req.params.id}}
        )
        .then(function([rowsUpdated, [updatedFood] ]) {
          updatedFood ? resolve(updatedFood) : reject({message: "Food not found."})
        })
      }
      else
      reject({message: "Name and Calories required."})
    })
  }
  return Food;
};

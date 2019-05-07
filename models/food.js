'use strict';
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

  Food.destroyItem = function(id) {
    return new Promise(function(resolve, reject) {
      Food.findByPk(id)
      .then(food => {
        food.destroy()
        .then(response => { resolve() })
        .catch(error => { reject() })
      })
      .catch(error => {
        reject()
      })
    })
  }
  return Food;
};

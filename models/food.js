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

  Food.updateItem = function(req) {
    return new Promise(function(resolve, reject) {
      Food.update(
        {name: req.body.name,
        calories: req.body.calories},
        {returning: true,
        where: {id: req.params.id}}
      )
      .then(function([rowsUpdated, [updatedFood] ]) {
        resolve(updatedFood)
      })
      .catch(error => reject({message: "Food not found."}))
    })
  }
  return Food;
};

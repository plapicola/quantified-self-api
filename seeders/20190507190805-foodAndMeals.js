'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      Promise.all([
        queryInterface.bulkInsert('Food', [
          {
            name: 'Banana',
            calories: 105,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Egg',
            calories: 75,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Salmon',
            calories: 203,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {}),
        queryInterface.bulkInsert('Meals', [
          {
            id: 1,
            name: 'Breakfast',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 2,
            name: 'Lunch',
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: 3,
            name: 'Dinner',
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {})
      ])
      .then(() => {
        resolve(queryInterface.bulkInsert('MealFoods', [
          {
            "FoodId": 1,
            "MealId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 2,
            "MealId": 1,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 2,
            "MealId": 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 3,
            "MealId": 2,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 1,
            "MealId": 3,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            "FoodId": 3,
            "MealId": 3,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ], {}))
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('MealFoods', null, {}),
      queryInterface.bulkDelete('Food', null, {}),
      queryInterface.bulkDelete('Meals', null, {})
    ])
  }
};

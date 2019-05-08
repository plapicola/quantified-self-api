'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
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
      queryInterface.bulkInsert('Meal', [
        {
          name: 'Breakfast',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Lunch',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Dinner',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {}),
      queryInterface.bulkInsert('MealFood', [
        {
          FoodId: 1,
          MealId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          FoodId: 2,
          MealId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          FoodId: 2,
          MealId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          FoodId: 3,
          MealId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          FoodId: 1,
          MealId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          FoodId: 3,
          MealId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Food', null, {}),
      queryInterface.bulkDelete('Meal', null, {}),
      queryInterface.bulkDelete('MealFood', null, {})
    ])
  }
};

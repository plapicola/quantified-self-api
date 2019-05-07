'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Food', [
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
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Food', null, {});
  }
};

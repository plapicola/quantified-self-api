var shell = require('shelljs');
var request = require('supertest');
var app = require('../app');

describe('Meals API', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  })

  describe('Get meals path', () => {
    test('Should return all meals', () => {
      return request(app).get('/api/v1/meals')
        .then(response => {
          expect(response.status).toBe(200)
          expect(Array.isArray(response.body)).toBe(true)
          expect(response.body.length).toBe(3)
          expect(response.body[0].id).toBe(1)
          expect(response.body[0].name).toBe("Breakfast")
          expect(Array.isArray(response.body[0].food)).toBe(true)
          expect(response.body[0].food.length).toBe(2)
        })
    })
  })
})

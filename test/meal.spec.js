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
          expect(typeof response.body).toBe('array')
          expect(response.body.length).toBe(3)
          expect(response.body[0].id).toBe(1)
          expect(response.body[0].name).toBe("Breakfast")
          expect(typeof response.body[0].foods).toBe('array')
          expect(response.body[0].foods.length).toBe(2)
        })
    })
  })
})

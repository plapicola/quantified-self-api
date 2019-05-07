var shell = require('shelljs');
var request = require('supertest');
var app = require('../app');

describe('Food API', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  })

  describe('Get games path', () => {
    test('Should return all food items in the system', () => {
      return request(app).get('/api/v1/foods')
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.length).toBe(3)
          expect(response.body[0].name).toBe("Banana")
          expect(response.body[0].calories).toBe(105)
        })
    })
  })
})

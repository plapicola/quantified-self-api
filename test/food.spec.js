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

  describe('Get foods path', () => {
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

  describe('Get food path', () => {
    test('Should return one food item by it Id in the system', () => {
      return request(app).get('/api/v1/foods/1')
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.id).toBe(1)
        expect(response.body.name).toBe('Banana')
        expect(response.body.calories).toBe(105)
      })
    })
    test('Should return a 404 Food not found for an invalid id in params', () => {
      return request(app).get('/api/v1/foods/7')
      .then(response => {
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Food not found.')
      })
    })
  })

  describe('Create foods path', () => {
    test('Should allow the creation of food objects', () => {
      return request(app).post('/api/v1/foods').send({
        food: {
          name: "Apple",
          calories: 95
        }
      })
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.body.name).toBe("Apple")
        expect(response.body.calories).toBe(95)
      })
    })

    test('Should return a 400 and a message indicating calories are missing', () => {
      return request(app).post('/api/v1/foods').send({
        food: {
          name: "Apple"
        }
      })
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("Calories are required")
      })
    })

    test('Should return a 400 and a message indicating name is missing', () => {
      return request(app).post('/api/v1/foods').send({
        food: {
          calories: 95
        }
      })
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.body.error).toBe("Name is required")
      })
    })

    test('Should return a 400 and send a message if not formatted', () => {
      return request(app).post('/api/v1/foods').send({name: "Pear", calories: "20"})
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.error).toBe("Invalid format")
        })
    })
  })
})

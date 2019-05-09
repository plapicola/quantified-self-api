var shell = require('shelljs');
var request = require('supertest');
var app = require('../app');

describe('API Spec', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  })

  describe('Meals API', () => {
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

    describe('Get meal math', () => {
      test('Should return a single meal', () => {
        return request(app).get("/api/v1/meals/1/foods")
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.id).toBe(1)
          expect(response.body.name).toBe("Breakfast")
          expect(Array.isArray(response.body.food))
          expect(response.body.food[0].name).toBe("Banana")
          expect(response.body.food[0].calories).toBe(105)
        })
      })

      test('Should return a 404 if provided an invalid id', () => {
        return request(app).get('/api/v1/meals/4/foods')
          .then(response => {
            expect(response.status).toBe(404)
            expect(response.body.error).toBe("Meal not found");
          })
      })
    })
  })

  describe('Food API', () => {
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

    describe('Delete food path', () => {
      test('Should delete the food record by id from the system', () => {
        request(app).delete('/api/v1/foods/1')
        .then(response => {
          expect(response.status).toBe(204)
        })
      })
      
      test('should return a 404 food not found for and invalid id in params', () => {
        return request(app).delete('/api/v1/foods/7')
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

    describe('PATCH update food item path', () => {
      test('Should return the food item with the updated values', () => {
        return request(app)
        .patch('/api/v1/foods/2')
        .send({name: "Not Banana", calories: 0})
        .then(response => {
          expect(response.status).toBe(200)
          expect(response.body.id).toBe(2)
          expect(response.body.name).toBe('Not Banana')
          expect(response.body.calories).toBe(0)
        })
      })
      test('Should return 404 if Id for food is not in database', () => {
        return request(app)
        .patch('/api/v1/foods/7')
        .send({name: "Not Banana", calories: 0})
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.message).toBe('Food not found.')
        })
      })
      test('Should return 404 if name and calories are not in body of update', () => {
        return request(app)
        .patch('/api/v1/foods/7')
        .send({name: "Not Banana"})
        .then(response => {
          expect(response.status).toBe(400)
          expect(response.body.message).toBe('Name and Calories required.')
        })
      })
    })
  })
})

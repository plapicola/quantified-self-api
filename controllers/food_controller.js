var Food = require('../models').Food;
var FoodSerializer = require('../serializers/food_serializer');
var FoodCreateFacade = require('../facades/food_create_facade');

module.exports = class FoodController {
  static index(request, response) {
    response.setHeader("Content-Type", "application/json");
    Food.findAll()
      .then(foods => {
        response.status(200).send(FoodSerializer.formatAll(foods))
      })
  }

  static create(request, response) {
    response.setHeader("Content-Type", "application/json");
    FoodCreateFacade.createFood(request.body.food)
    .then(facade => {
      response.status(facade.status).send(facade.body)
    })
    .catch(facade => {
      response.status(facade.status).send(facade.body)
    })
  }

  static show(req, res) {
    res.setHeader('Content-Type', 'application/json');
    Food.findItem(req.params.id)
      .then(food => {
        res.status(200).send(FoodSerializer.formatOne(food));
      })
      .catch(error => {
        res.status(404).send(error)
      })
  }
}

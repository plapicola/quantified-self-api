var Food = require('../models').Food;
var FoodSerializer = require('../serializers/food_serializer');

module.exports = class FoodController {
  static index(request, response) {
    response.setHeader("Content-Type", "application/json");
    Food.findAll()
      .then(foods => {
        response.status(200).send(FoodSerializer.formatAll(foods))
      })
  }

  static show(req, res) {
    Food.findItem(req.params.id)
      .then(food => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(food);
      })
      .catch(error => {
        res.status(404).send(error)
      })
  }

  static destroy(req, res) {
    Food.destroyItem(req.params.id)
    .then(pass => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(404).send(error)
    })
  }
}

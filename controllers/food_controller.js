var Food = require('../models').Food;
var FoodSerializer = require('../serializers/food_serializer');

module.exports = class FoodController {
  static index(request, response) {
    Food.findAll()
      .then(foods => {
        response.status(200).send(FoodSerializer.formatAll(foods))
      })
  }
}

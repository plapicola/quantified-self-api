var Food = require('../models').Food;

module.exports = class FoodController {
  static index(request, response) {
    Food.findAll()
      .then(foods => {
        response.status(200).send(foods)
      })
  }
}

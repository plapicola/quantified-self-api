var Food = require('../models').Food

module.exports = class FoodController {

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
}

const user = require('express').Router();
const { UserController } = require('../controllers');

user
  .get('/', UserController.findAll)
  .post('/', UserController.register)

module.exports = user
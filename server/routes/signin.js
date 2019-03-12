const user = require('express').Router();
const { UserController } = require('../controllers');

user
  .post('/', UserController.signInLocal)

module.exports = user
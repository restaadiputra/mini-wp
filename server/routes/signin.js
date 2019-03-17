const user = require('express').Router();
const { UserController } = require('../controllers');

user
  .post('/local', UserController.signInLocal)
  .post('/google', UserController.signInGoogle)

module.exports = user
const router = require('express').Router();
const article = require('./article')
const user = require('./user')
const signin = require('./signin')

router
  .use('/signin', signin)
  .use('/article', article)
  .use('/user', user)

module.exports = router;
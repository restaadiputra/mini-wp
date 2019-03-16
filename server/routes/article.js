const article = require('express').Router();
const { ArticleController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate')
const { authorize } = require('../middlewares/authorize')

article
  .use('/', authenticate)
  .get('/user', ArticleController.findOneByUser)
  .get('/', ArticleController.findAll)
  .get('/:id', ArticleController.findOne)
  .post('/', ArticleController.create)
  .put('/:id', authorize, ArticleController.update)
  .delete('/:id', authorize, ArticleController.delete)

module.exports = article
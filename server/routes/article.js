const article = require('express').Router();
const { ArticleController } = require('../controllers');
const { jwt } = require('../middlewares/jwt')

article
  .use('/', jwt)
  .get('/user', ArticleController.findOneByUser)
  .get('/', ArticleController.findAll)
  .get('/:id', ArticleController.findOne)
  .post('/', ArticleController.create)
  .put('/:id', ArticleController.update)
  .delete('/:id', ArticleController.delete)

module.exports = article
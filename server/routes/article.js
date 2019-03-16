const article = require('express').Router();
const { ArticleController } = require('../controllers');
const { authenticate } = require('../middlewares/authenticate')
const { authorize } = require('../middlewares/authorize')
const { multer, uploadToGCS } = require('../middlewares/image')

// Prevent unauthenticate user to use /article API
article.use('/', authenticate)

article.get('/user', ArticleController.findOneByUser)
article.get('/', ArticleController.findAll)
article.get('/:id', ArticleController.findOne)
article.post('/', multer.single('image'), uploadToGCS, ArticleController.create)

// Prevent unauthorize user to use update & delete in /article API
article.put('/:id', authorize, multer.single('image'), uploadToGCS, ArticleController.update)
article.delete('/:id', authorize, ArticleController.delete)

module.exports = article
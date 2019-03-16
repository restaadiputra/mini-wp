const { Article } = require('../models');

module.exports = {
  findAll({ query }, res, next) {
    q = {}
    if(query && query.q) {
      q = q.split('+').join(' ')
    }
    
    Article
      .find(q)
      .then(articles => {
        res.status(200).json(articles)
      })
      .catch(next)
  },
  findOne({ params }, res, next) {
    Article
      .findById(params.id)
      .then(article => {
        if(article) {
          res.status(200).json(article)
        } else {
          res.status(404).json({
            msg: 'No article found.'
          })
        }
      })
      .catch(next)
  },
  findOneByUser({ query, decoded }, res, next) {
    let filter = { userId:decoded.id }
    if(query && query.title) {
      filter.title = new RegExp(query.title, 'i')
    }
    Article
      .find(filter)
      .then(function(articles) {
        res.status(200).json(articles)
      })
      .catch(next)
  },
  create({ body, decoded }, res, next) {
    body.userId = decoded.id
    Article
      .create({...body})
      .then(article => {
        res.status(201).json(article)
      })
      .catch(next)
  },
  update({ params, body, decoded }, res, next) {
    body.userId = decoded.id
    let opts = {
      new: true,
      runValidators: true,
      context: 'query'
    }

    Article
      .findOneAndUpdate({_id: params.id}, {...body}, opts)
      .then(article => {
        if(article.userId !== body.userId) {
          res.status(200).json
        }
        if(article) {
          res.status(200).json(article)
        } else {
          res.status(404).json({
            msg: 'No article found.'
          })
        }
      })
      .catch(next)
  },
  delete({ params }, res, next) {
    Article
      .findOneAndDelete({_id: params.id})
      .then(article => {
        if(article) {
          res.status(200).json(article)
        } else {
          res.status(404).json({
            msg: 'No article found.'
          })
        }
      })
      .catch(next)
  }
}
const { Article } = require('../models');

module.exports = {
  authorize({ params, decoded }, res, next) {
    console.log(params.id)
    Article
      .findById(params.id)
      .then(article => {
        console.log('article = ',article)
        if(decoded.id === article.userId) {
          next()
        } else {
          res.status(401).json({
            warning: 'You are not authorize to access this data!'
          })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: err
        })
      })
  }
}
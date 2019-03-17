const { Article } = require('../models');

module.exports = {
  authorize({ params, decoded }, res, next) {
    Article
      .findById(params.id)
      .then(article => {
        if(decoded.id === String(article.userId)) {
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
          msg: err
        })
      })
  }
}
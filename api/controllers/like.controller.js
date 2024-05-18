const Like = require('../models/likes.model');

module.exports.create = (req, res, next) => {
  const like = { 
    owner: req.user.id,
    product: req.body.product
  }
  Like.create(like)
    .then(like => res.status(204).json(like))
    .catch(next)
}

module.exports.delete = (req, res, next) => {

}
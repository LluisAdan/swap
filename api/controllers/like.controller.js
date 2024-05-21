const Like = require('../models/likes.model');

module.exports.create = (req, res, next) => {
  Like.findOne({ like_owner: req.user.id, favorite_product: req.params.productId })
    .then((like) => {
      if (like) {
        res.status(409).json({message: "Like already exists"});
      } else {
        const like = { 
          like_owner: req.user.id,
          favorite_product: req.params.productId
        };
        return Like.create(like)
          .then(like => res.status(201).json(like))
          .catch(next);
      };
    })
    .catch(next);
};

module.exports.list = (req, res, next) => {
  const userId = req.user.id;

  Like.find({ like_owner: userId })
  .populate("fav_product")
  .then((likes) => {
    res.json(likes);
  })
  .catch(next);
};

module.exports.delete = (req, res, next) => {
  Like.findOneAndDelete({favorite_product: req.params.id})
    .then(like => {
      if (!like) {
        return res.status(404).json({ message: 'Like not found' });
      }
      res.status(204).json({ message: 'Like deleted' });
    })
    .catch(next)
}
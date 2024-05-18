const mongoose = require('mongoose');
const Rating = require('../models/rating.model');

module.exports.create = (req, res, next) => {
  Rating.create({
    rating: req.body.rating,
    text: req.body.text,
    owner: req.user.id,
    target: req.params.userId
  })
  .then((rating) => {
    res.status(201).json(rating);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json(err.errors);
    } else {
      next(err);
    }
  });
};

module.exports.list = (req, res, next) => {
  const { userId } = req.params;

  Rating.find({ target: userId })
  .populate("owner")
  .then((ratings) => {
    res.json(ratings);
  })
  .catch(next);
};

module.exports.delete = (req, res, next) => {
  Rating.findByIdAndDelete(req.params.id)
    .then((rating) => {
      if (rating) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Rating not found"});
      };
    })
    .catch(next);
};
const mongoose = require('mongoose');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
  Rating.create({
    rating: req.body.rating,
    title: req.body.title,
    text: req.body.text
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
  Rating.find()
  .then((ratings) => {
    res.json(ratings);
  })
  .catch(next);
};

module.exports.detail = (req, res, next) => {
  Rating.findById(req.params.id)
  .then((rating) => {
    if (rating) {
      res.json(rating);
    } else {
      res.status(404).json({ message: "Rating not found"});
    };
  })
  .catch(next);
};

module.exports.update = (req, res, next) => {
  Rating.findByIdAndUpdate(req.params.id, req.body, {  // Cambiar req.body
    runValidators: true,
    new: true
  })
    .then((rating) => {
      if (rating) {
        res.json(rating);
      } else {
        res.status(404).json({ message: "Rating not found"});
      };
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
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
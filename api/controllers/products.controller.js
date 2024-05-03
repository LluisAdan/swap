const mongoose = require('mongoose');
const Product = require('../models/product.model');

module.exports.create = (req, res, next) => {
  Product.create(req.body)
    /*
    ({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    preferences: req.body.preferences
    !!!!!!! geojson
    })
    */
    .then((product) => {
      res.status(201).json(product);
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
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found"});
      }
    })
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {  // Cambiar req.body
    runValidators: true,
    new: true
  })
    .then((product) => {
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found"});
      }
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
  Product.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Product not found"});
      }
    })
    .catch(next);
};
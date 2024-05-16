const mongoose = require('mongoose');
const Product = require('../models/product.model');

module.exports.create = (req, res, next) => {

  if (req.file) {
    req.body.image = req.file.path;
  }
  
  Product.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      location: req.body.location, // geojson
      owner: req.user.id
    })
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
  const { category, limit = process.env.DEFAULT_LIMIT, page = 0 } = req.query;
  const criterial = {};
  if (category) {
    criterial.category = category;
  }
  Product.find(criterial)
    .sort({ _id: -1 })
    .limit(limit)
    .skip(limit * page)
    .then((products) => res.json(products))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  Product.findById(req.params.id)
    .populate({
      path: "owner",
      populate: {
        path: "ratings",
        populate: {
          path: "owner"
        }
      }
    })
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
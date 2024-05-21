const mongoose = require('mongoose');
const Product = require('../models/product.model');

module.exports.create = (req, res, next) => {

  if (req.file) req.body.image = req.file.path;

  let location = req.body.location;
  try {
    location = JSON.parse(location);
  } catch(error) {
    return res.status(400).json({ error: "Invalid location format" });
  }
  
  Product.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      location: location,
      owner: req.user.id
    })
    .then((product) => res.status(201).json(product))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.list = (req, res, next) => {
  const { category, lat, lng, limit = process.env.DEFAULT_LIMIT, page = 0 } = req.query;
  const criterial = {};
  if (category) criterial.category = category;
  if (lat && lng) {
    criterial.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 100000,
        $minDistance: 0
      }
    };
  };

  Product.find(criterial)
    .sort({ _id: -1 })
    //.limit(limit)
    //.skip(limit * page)
    .then((products) => res.json(products))
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  const { lat, lng } = req.query;
  const criterial = {};
  if (lat && lng) {
    criterial.location = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 100000,
        $minDistance: 0
      }
  }
};

  Product.findById(req.params.id, criterial)
    .populate({
      path: "owner",
      populate: {
        path: "ratings",
        populate: {
          path: "owner"
        }
      }
    })
    .then((product) => (product) ? res.json(product) : res.status(404).json({ message: "Product not found"}))
    .catch(next);
};

module.exports.update = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  })
    .populate("product_owner")
    .populate("product_target")
    .then((product) => (product) ? res.json(product) : res.status(404).json({ message: "Product not found"}))
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
    .then((product) => (product) ? res.status(204).send() : res.status(404).json({ message: "Product not found"}))
    .catch(next);
};
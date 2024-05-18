const mongoose = require('mongoose');
const Request = require('../models/request.model');

module.exports.create = (req, res, next) => {
  Request.create({
    request_owner: req.user.id,
    product_owner: req.body.product_owner,
    request_target: req.body.target_id,
    product_target: req.body.product_target,
  })
  .then((request) => {
    res.status(201).json(request);
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

  Request.find({ target_user: userId })
  .populate("requests_user")
  .then((requests) => {
    res.json(requests);
  })
  .catch(next);
};
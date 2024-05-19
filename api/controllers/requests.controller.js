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
    next(err);
  });
};

module.exports.list = (req, res, next) => {
  const { userId } = req.params;

  Request.find({ request_target: userId })
  .populate("request_target")
  .populate("request_owner")
  .populate("product_target")
  .populate("product_owner")
  .then((requests) => {
    res.json(requests);
  })
  .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  Request.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })

    .then((request) => {
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      res.status(200).json(request);
    })
    .catch((err) => {
      next(err);
    });
};
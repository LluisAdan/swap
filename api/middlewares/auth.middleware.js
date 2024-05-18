const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.checkAuth = (req, res, next) => {
  const token = req.headers?.authorization?.split('Bearer ')?.[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    const sub = decoded.sub;

    User.findById(sub)
      .populate('products')
      .populate('requests_user')
      .populate('target_user')
      .populate('likes')
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ message: "Unauthorizated" });
        }
      })
      .catch(next);
  });
};

module.exports.isOwnerProfile = (req, res, next) => {
  if (req.params.id == req.user.id) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorizated"});
  }
};

module.exports.isOwnerProduct = (req, res, next) => {
  const user = req.user;
  if (user.products.some((product) => product.id == req.params.id)){
    next();
  } else {
    res.status(401).json({ message: "Unauthorizated"});
  }
};

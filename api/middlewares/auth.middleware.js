const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.checkAuth = (req, res, next) => {
  const token = req.headers?.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: err.message });
    }
    const sub = decoded.sub;

    User.findById(sub)
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
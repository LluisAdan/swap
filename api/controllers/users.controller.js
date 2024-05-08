const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
  const userCreate = {
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    birthDate: req.body.birthDate,
    genre: req.body.genre,
    preferences: req.body.preferences
  };

  if (req.file) {
    userCreate.avatar = req.file.path;
  }

  User.create(userCreate)
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json(err.errors);
    } else {
      next(err);
    };
  });
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
  .populate('products')
  .then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found"});
    };
  })
  .catch(next);
};

module.exports.update = (req, res, next) => {
  const patch = {
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    birthDate: req.body.birthDate,
    genre: req.body.genre,
    preferences: req.body.preferences
  };

  if (req.file) {
    patch.avatar = req.file.path;
  }

  if (req.body.password) {
    patch.password = req.body.password;
  }

  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        Object.assign(user, patch)
        return user.save();
      }
    })
    .then(user => res.status(201).json(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      };
    });
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "User not found"});
      };
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              const accessToken = jwt.sign(
                { 
                  sub: user.id, 
                  exp: Date.now() / 1000 + 60 * 60
                },
                process.env.JWT_SECRET
              );
              
              res.json({ accessToken });
            } else {
              res.status(400).json({ message: "Invalid credentials"});  
            }
          })
      } else {
        res.status(400).json({ message: "Invalid credentials"});
      };
    })
    .catch(next)
};
const mongoose = require('mongoose');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
  User.create({
    name: req.body.name,
    lastName: req.body.lastName,
    username: req.body.username,
    //avatar: req.file.path,
    avatar: req.body.avatar,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    birthDate: req.body.birthDate,
    genre: req.body.genre,
    preferences: req.body.preferences
  })
  .then((user) => { // Da error 500 al duplicar username
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

module.exports.list = (req, res, next) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
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
  User.findByIdAndUpdate(req.params.id, req.body, {  // Cambiar req.body con auth
    runValidators: true,
    new: true
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found"});
      };
    })
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
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        user.checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              const accesToken = jwt.sign(
                { 
                  sub: user.id, 
                  exp: Date.now() / 1000 + 60 * 60
                },
                process.env.JWT_SECRET
              );
              
              res.json({ accesToken });
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
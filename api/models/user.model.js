const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../data/categories.json');
const genre = require('../data/genre.json');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required'
    }, 
    lastName: {
      type: String,
      required: 'Last name is required'
    },
    username: {
      type: String,
      required: 'Username is required',
      minLength: [2, 'Username needs at least 2 chars'],
      unique: true
    },
    avatar: {
      type: String
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true
    },
    password: {
      type: String,
      required: 'Password is required'
    },
    address: {
      type: String
    },
    birthDate: {
      type: Date,
      required: 'Birth date is required'
    },
    genre: {
      type: String,
      enum: genre
    },
    preferences: {
      type: String,
      enum: categories
    },
    history: {
      type: String
    },
    favoriteProducts: {
      type: [String]
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id,
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    bcrypt
      .hash(this.password, 10)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch(next);
  } else {
    next();
  };
});

userSchema.method('checkPassword', function (password) {
  return bcrypt.compare(password, this.password);
});

userSchema.virtual('ratings', {
  ref: 'UserRating',
  localField: '_id',
  foreignField: 'user',
});

const User = mongoose.model('User', userSchema);
module.exports = User;
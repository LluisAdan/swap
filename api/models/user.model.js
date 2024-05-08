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
    avatar: String,
    email: {
      type: String,
      required: 'Email is required',
      unique: true
    },
    password: {
      type: String,
      required: 'Password is required',
      minLength: [8, 'Password needs at least 8 chars']
    },
    address: String,
    birthDate: {
      type: Date,
      required: 'Birth date is required'
    },
    phone: String,
    genre: {
      type: String,
      enum: genre
    },
    preferences: {
      type: String,
      enum: categories
    },
    history: String,
    favoriteProducts: {
      type: [String]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
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

userSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'owner' 
});

userSchema.virtual('ratings', {
  ref: 'UserRating',
  localField: '_id',
  foreignField: 'user',
});

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

const User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../data/categories.json');
const genre = require('../data/genre.json');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: 'Name is required',
      minLength: [2, 'Name needs at least 2 chars'],
      maxLength: [16, 'Invalid name. Maximum characters: 16'],
      trim: true
    },  
    lastName: {
      type: String,
      required: 'Last name is required',
      minLength: [2, 'Last name needs at least 2 chars'],
      maxLength: [16, 'Invalid last name. Maximum characters: 16'],
      trim: true
    },
    username: {
      type: String,
      required: 'Username is required',
      minLength: [2, 'Username needs at least 2 chars'],
      maxLength: [16, 'Invalid username. Maximum characters: 16'],
      unique: true,
      trim: true
    },
    avatar: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    email: {
      type: String,
      required: 'Email is required',
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: 'Password is required',
      minLength: [8, 'Password needs at least 8 chars'],
      maxLength: [16, 'Invalid password. Maximum characters: 16']
    },
    birthDate: {
      type: Date,
      required: 'Birth date is required'
    },
    phone: {
      type: String,
      maxLength: [16, 'Invalid phone. Maximum characters: 16']
    },
    genre: {
      type: String,
      enum: genre
    },
    history: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }],
    favoriteProducts: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
    }]
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
  ref: 'Rating',
  localField: '_id',
  foreignField: 'target',
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
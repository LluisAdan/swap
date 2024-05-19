const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ratings = require('../data/ratings.json');

const ratingSchema = new Schema(
    {
        rating: {
          type: String,
          enum: ratings
        },
        text: {
          type: String,
          maxLength: [200, 'Invalid rating. Maximum characters: 200']
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        target: {
          type: Schema.Types.ObjectId,
          ref: "User"
        }
    },
    {
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          ret.id = ret._id,
          delete ret._id;
          delete ret.__v;
          return ret;
        }
      }
    }
);

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = Rating;
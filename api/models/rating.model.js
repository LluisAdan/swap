const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')

const ratingsSchema = new Schema(
    {
        rating: {
            type: Number,
            required: [true, 'Rating is required'],
            min: 0,
            max: 5
        },
        title: {
          type: String,
          required: [true, 'Comment title is required']
        },
        text: {
            type: String
        },
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

ratingsSchema.virtual('owner', {
    ref: 'UserRatings',
    localField: '_id',
    foreignField: 'ratings',
  });

const Ratings = mongoose.model('Rating', ratingsSchema);
module.exports = Ratings;
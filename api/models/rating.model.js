const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model')

const ratingsSchema = new Schema(
    {
        rating: {
            type: Number,
            required: [true, 'Rating is required']
        },
        title: {
          type: String,
          required: [true, 'Comment title is required']
        },
        text: {
            type: String
        },
    }
);

ratingsSchema.virtual('owner', {
    ref: 'UserRatings',
    localField: '_id',
    foreignField: 'ratings',
  });

const Ratings = mongoose.model('Rating', ratingsSchema);
module.exports = Ratings;
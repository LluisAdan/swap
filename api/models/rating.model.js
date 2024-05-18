const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema(
    {
        rating: {
          type: Number,
          required: [true, 'Rating is required'],
          min: 0,
          max: 5
        },
        text: {
          type: String,
          required: [true, 'Rating text is required'],
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
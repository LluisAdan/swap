const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
          required: [true, 'Rating title is required']
        },
        text: String,
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

const Ratings = mongoose.model('Rating', ratingsSchema);
module.exports = Ratings;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const Ratings = require('./rating.model');

const userRatingsSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: mongoose.Types.ObjectId,
            ref: 'Ratings'
        }
    }
);

const UserRatings = mongoose.model('UserRating', userRatingsSchema);
module.exports = UserRatings;
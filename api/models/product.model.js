const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../data/categories.json');
const prices = require('../data/prices.json');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title is required'
    },
    description: {
      type: String,
      required: 'Description is required'
    },
    image: {
      type: String,
      required: 'Image is required',
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    },
    category: {
      type: String,
      enum: categories,
      required : 'Category is required'
    },
    price: {
      type: String,
      enum: Object.keys(prices),
      required: 'Price range required'
    },
    preferences: {
      type: [String],
      enum: categories,
      required: 'Preferences are required'
    },
    availability: {
      type: Boolean,
      default: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    owner: {
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

productSchema.index({ location: '2dsphere' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
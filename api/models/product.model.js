const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categories = require('../data/categories.json');
const prices = require('../data/prices.json');

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
      minLength: [2, 'Title needs at least 2 chars'],
      maxLength: [60, 'Invalid title. Maximum characters: 60']
    },
    description: {
      type: String,
      required: 'Description is required',
      minLength: [2, 'Description needs at least 2 chars'],
      maxLength: [250, 'Invalid title. Maximum characters: 250']
    },
    image: {
      type: String, 
      required: 'Image is required'
    },
    category: {
      type: String,
      enum: categories,
      required : 'Category is required'
    },
    price: {
      type: String,
      enum: prices,
      required: 'Price range required'
    },
    available: {
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

productSchema.virtual('requests_product', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'product_owner',
});

productSchema.virtual('target_product', {
  ref: 'Request',
  localField: '_id',
  foreignField: 'product_target',
});

productSchema.virtual('fav_product', {
  ref: 'Like',
  localField: '_id',
  foreignField: 'favorite_product'
})

productSchema.index({ location: '2dsphere' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const status = require('../data/status.json')

const requestSchema = new Schema(
  {
    status: {
      type: String,
      enum: status,
      default: "pending"
    },  
    request_owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    request_target: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    product_owner: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    },
    product_target: {
      type: Schema.Types.ObjectId,
      ref: "Product"
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

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
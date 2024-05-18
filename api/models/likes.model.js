const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema(
    {
        owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product"
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

const Like = mongoose.model('Like', likesSchema);
module.exports = Like;
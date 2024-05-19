const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likesSchema = new Schema(
    {
        like_owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
        },
        favorite_product: {
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
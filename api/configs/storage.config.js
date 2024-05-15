const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req) => {
        if (req.path === '/products') {
          return 'Swap/products';
        } else if (req.path ==='/users') {
          return 'Swap/users';
        };
      },
      format: (req, file) => {
        return 'png';
      },
      public_id: (req) => {
        if (req.path === '/products') {
          return req.body.title;
        } else if (req.path ==='/users') {
          return req.body.username;
        };
      }
    },
  });
   
module.exports = multer({ storage });
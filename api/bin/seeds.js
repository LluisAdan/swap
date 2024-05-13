require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('../models/product.model');
const productsData = require('../data/products.json');

require('../configs/db.config');


mongoose.connection.once('open', () => {
  console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
  mongoose.connection.db.dropCollection('products')
    .then(() => {
      console.info('Dropped products collection');
      return Product.create(productsData);
    })
    .then((products) => console.info(`- ${products.length} products created`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))
});

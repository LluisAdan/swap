require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/user.model');
const usersData = require('../data/usersData.json')
const Product = require('../models/product.model');
const productsData = require('../data/productsData.json');
const Rating = require('../models/rating.model');
const ratingsData = require('../data/ratingsData.json');

require('../configs/db.config');

/*
mongoose.connection.once('open', () => {
  console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
  mongoose.connection.db.dropCollection('users')
    .then(() => {
      console.info('Dropped users collection');
      return User.create(usersData);
    })
    .then((users) => console.info(`- ${users.length} users created`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))
});
*/

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

mongoose.connection.once('open', () => {
  console.info(`Successfully connected to the database ${mongoose.connection.db.databaseName}`);
  mongoose.connection.db.dropCollection('ratings')
    .then(() => {
      console.info('Dropped ratings collection');
      return Rating.create(ratingsData);
    })
    .then((ratings) => console.info(`- ${ratings.length} ratings created`))
    .catch((error) => console.error(error))
    .finally(() => process.exit(0))
});
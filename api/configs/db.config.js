const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/swap';

mongoose.connect(MONGODB_URI)
.then(() => console.info('Successfully connected to the database'))
.catch((error) => console.error('An oc=error ocurred trying to connect to the database', error))
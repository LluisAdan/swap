const express = require('express');
const router = express.Router();
const products = require('../controllers/products.controller');
const users = require('../controllers/users.controller');

// Product's routes
router.post('/products', products.create);
router.get('/products', products.list);
router.get('/products/:id', products.detail);
router.patch('/products/:id', products.update);
router.delete('/products/:id', products.delete);

// User's routes
router.post('/users', users.create);
router.get('/users', users.list);
router.get('/users/:id', users.detail);
router.patch('/users/:id', users.update);
router.delete('/users/:id', users.delete);


module.exports = router;
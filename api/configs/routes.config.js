const express = require('express');
const router = express.Router();
const products = require('../controllers/products.controller');
const users = require('../controllers/users.controller');
const ratings = require('../controllers/ratings.controller');
const auth = require('../middlewares/auth.middleware');

// Product's routes
router.post('/products', auth.checkAuth, products.create);
router.get('/products', products.list);
router.get('/products/:id', products.detail);
router.patch('/products/:id', auth.checkAuth, auth.isOwnerProduct, products.update);
router.delete('/products/:id', auth.checkAuth, auth.isOwnerProduct, products.delete);

// User's routes
router.post('/users', users.create);
router.get('/users/:id', auth.checkAuth, users.detail);
router.patch('/users/:id', auth.checkAuth, auth.isOwnerProfile, users.update);
router.delete('/users/:id', auth.checkAuth, auth.isOwnerProfile, users.delete);
router.post('/login', users.login);
router.get('/profile', auth.checkAuth, users.profile);

// Rating's routes
router.post('/users/:userId/ratings', auth.checkAuth, ratings.create);

module.exports = router;
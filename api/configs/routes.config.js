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
router.patch('/products/:id', auth.checkAuth, products.update);
router.delete('/products/:id', auth.checkAuth, products.delete);

// User's routes
router.post('/users', users.create);
router.get('/users', users.list);
router.get('/users/:id', auth.checkAuth, users.detail);
router.patch('/users/:id', auth.checkAuth, users.update);
router.delete('/users/:id', auth.checkAuth, users.delete);
router.post('/login', users.login);

// Rating's routes ??????????????????????????????
router.post('/ratings', auth.checkAuth, ratings.create);
router.get('/ratings', ratings.list);
router.get('/ratings/:id', ratings.detail);
router.patch('/ratings/:id', auth.checkAuth, ratings.update);
router.delete('/ratings/:id', auth.checkAuth, ratings.delete);

module.exports = router;
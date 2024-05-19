const express = require('express');
const router = express.Router();
const storage = require('../configs/storage.config');
const products = require('../controllers/products.controller');
const users = require('../controllers/users.controller');
const ratings = require('../controllers/ratings.controller');
const requests = require('../controllers/requests.controller');
const like = require('../controllers/like.controller');
const auth = require('../middlewares/auth.middleware');

// Product's routes
router.post('/products', auth.checkAuth, storage.single('image'), products.create);
router.get('/products', products.list);
router.get('/products/:id', products.detail);
router.patch('/products/:id', auth.checkAuth, storage.single('image'), products.update);
router.delete('/products/:id', auth.checkAuth, auth.isOwnerProduct, products.delete);

// User's routes
router.post('/users', storage.single('avatar'), users.create);
router.get('/users/:id', auth.checkAuth, users.detail);
router.patch('/users/:id', auth.checkAuth, auth.isOwnerProfile, storage.single('avatar'), users.update);
router.delete('/users/:id', auth.checkAuth, auth.isOwnerProfile, users.delete);
router.post('/login', users.login);
router.get('/profile', auth.checkAuth, users.profile);

// Rating's routes
router.post('/users/:userId/ratings', auth.checkAuth, ratings.create);
router.get('/users/:userId/ratings', ratings.list);

// Request's routes
router.post('/requests', auth.checkAuth, requests.create);
router.get('/users/:userId/requests', auth.checkAuth, requests.list);
router.patch('/requests/:id', auth.checkAuth, requests.update);

//Likes routes
router.post('/like', auth.checkAuth, like.create);
router.delete('/like', auth.checkAuth, like.delete)

module.exports = router;
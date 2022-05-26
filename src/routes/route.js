const express = require('express');
let router = express.Router();
const controller = require('../controllers/userController')
const product = require('../controllers/productController')
const { authentication, authorization_user } = require('../middleware/auth')

// user
router.post('/register', controller.createUser)
router.post('/login', controller.login)
router.put('/user/:userId/profile', authentication, authorization_user, controller.update)
router.get('/user/:userId/profile', authentication, controller.getUser)

// products
router.post('/products', product.create)
router.get('/products', product.getProduct)
router.get('/products/:productId', product.getProductById)
router.delete('/products/:productId', product.deleteProduct)


module.exports = router;
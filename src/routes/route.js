const express = require('express');
let router = express.Router();
const controller = require('../controllers/userController')
const { authentication, authorization_user} = require('../middleware/auth')

router.post('/register', controller.createUser)
router.post('/login', controller.login)
router.put('/user/:userId/profile', authentication, authorization_user, controller.update)
router.get('/user/:userId/profile', authentication, controller.getUser)

module.exports = router;
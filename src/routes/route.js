const express = require('express');
let router = express.Router();
const controller = require('../controllers/userController')

router.post('/register', controller.createUser)
router.post('/login', controller.login)
router.put('/user/:userId/profile', controller.update)
router.get('/user/:userId/profile', controller.getUser)

module.exports = router;
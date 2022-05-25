const express = require('express');
let router = express.Router();
const controller = require('../controllers/userController')

router.post("/", (req, res) => {
    res.send('ok')
})

router.post('/register',controller.createUser)
router.post('/login',controller.login)
router.get('/user/:userId/profile', controller.getUser)

module.exports = router;
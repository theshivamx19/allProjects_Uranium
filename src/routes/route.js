const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookControllers")
//const middlewares = require('../middlewares/auth');

router.post("/register",userController.UserCreate);
router.post("/login",userController.LoginCreate);
router.get("/books",bookController.getBooks)

module.exports = router; 

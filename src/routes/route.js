const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
//const middlewares = require('../middlewares/auth');

router.post("/register",userController.UserCreate);
router.post("/login",userController.LoginCreate);
//router.get("/functionup/collegeDetails",InternController.getdata);
module.exports = router; 

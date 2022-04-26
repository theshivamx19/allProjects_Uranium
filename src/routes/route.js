const express = require('express');
const router = express.Router();

const autherController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")


router.post("/createauthor", autherController.createAuther)
router.post("/createblogs", blogController.createblog)



module.exports =  router;
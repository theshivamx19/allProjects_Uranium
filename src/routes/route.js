const express = require('express');
const router = express.Router();

const autherController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const updatecontroller = require("../controllers/updateblogController")


router.post("/createauthor", autherController.createAuther)
router.post("/createblogs", blogController.createblog)
// router.put("/putupdateblog/:blogId", updatecontroller.putupdateblog)
router.put("/putPublished/:blogId", updatecontroller.putPublished)



module.exports =  router;
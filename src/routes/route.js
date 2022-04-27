const express = require('express');
const router = express.Router();

const autherController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
<<<<<<< HEAD
const updatecontroller = require("../controllers/updateblogController")


router.post("/createauthor", autherController.createAuther)
router.post("/createblogs", blogController.createblog)
// router.put("/putupdateblog/:blogId", updatecontroller.putupdateblog)
router.put("/putPublished/:blogId", updatecontroller.putPublished)
=======
const deleteControllerId = require("../controllers/deleteController")
const deleteControllerParams = require("../controllers/deleteBlogParamsController")

router.post("/createauthor", autherController.createAuther)
router.post("/createblogs", blogController.createblog)
router.put("/blogs/:blogId", deleteControllerId.deleteBlogId)
router.put("/blogs", deleteControllerParams.deleteBlogparams)
>>>>>>> 473a7e145b4cefb76ef26e6cb5be8141e7c318dc


module.exports =  router;


//"email-validator": "^2.0.4", dependebc
const express = require('express');
const router = express.Router();

const autherController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const deleteControllerId = require("../controllers/deleteController")
const deleteControllerParams = require("../controllers/deleteBlogParamsController")

router.post("/createauthor", autherController.createAuther)
router.post("/createblogs", blogController.createblog)
router.put("/blogs/:blogId", deleteControllerId.deleteBlogId)
router.put("/blogs", deleteControllerParams.deleteBlogparams)


module.exports =  router;
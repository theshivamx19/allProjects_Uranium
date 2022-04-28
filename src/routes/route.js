const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const getBlogController = require("../controllers//getBlogController")
const updateblogController = require("../controllers/updateblogController")
const deleteController = require("../controllers/deleteController")
const deleteBlogParamsController = require("../controllers/deleteBlogParamsController")


router.post('/CreateAuthors', authorController.addAuthor);
router.post('/CreateBlog', blogController.createBlog);
router.get('/getBlogs', getBlogController.getBlogs);
router.put('/updateBlog/:blogId', updateblogController.putPublished);
router.delete('/deleteBlog/:blogId', deleteController.deleteBlogById);
router.delete('/deleteBlogsParams', deleteBlogParamsController.deleteBlogsByParams);


module.exports =  router;


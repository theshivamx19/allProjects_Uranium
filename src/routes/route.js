const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const authController = require('../middleWare/auth')

router.post('/Authors', authorController.creatAuthor);
router.post('/login', authorController.loginAuthor);
router.post('/blogs',authController.authentication, blogController.createBlog);
router.get('/blogs',authController.authentication, blogController.getBlogs);
router.put('/blogs/:blogId',authController.authentication, blogController.putPublished);
router.delete('/blogs/:blogId',authController.authentication, blogController.deleteBlogById);
router.delete('/blogs',authController.authentication, blogController.deleteBlogsByQuery);

module.exports =  router;


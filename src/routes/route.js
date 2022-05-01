











const express = require('express');
const router = express.Router();

const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const authController = require('../middleWare/auth')

router.post('/authors', authorController.addAuthor);
router.post('/login', authorController.loginAuthor);
router.post('/blogs',authController.authencation, blogController.createBlog);
router.get('/blogs',authController.authencation, blogController.getBlogs);
router.put('/blogs/:blogId', authController.authorisation,blogController.putPublished);
router.delete('/blogs/:blogId',authController.authorisation, blogController.deleteBlogById);
router.delete('/blogs',authController.authorisation, blogController.deleteBlogsByParams);

module.exports =  router;


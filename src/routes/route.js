const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const bookController = require("../controllers/bookControllers")
const reviewController = require("../controllers/reviewController")
const auth = require("../middleware/auth")
//const middlewares = require('../middlewares/auth');

router.post("/register", userController.UserCreate);
router.post("/login", userController.LoginCreate);
router.post("/books", auth.validateToken,auth.authorisation, bookController.bookcreate);
router.get("/books", bookController.getBooks)
router.get("/books/:bookId",bookController.getBook)
router.delete('/books/:bookId',auth.validateToken, auth.authorisation,bookController.deleteBookById)
router.put("/books/:bookId", auth.validateToken, auth.authorisation, bookController.bookupdate)
router.post("/books/:bookId/review", reviewController.creatReview)
router.put("/books/:bookId/review/:reviewId", reviewController.reviewupdate)
router.delete("/books/:bookId/review/:reviewId", reviewController.deletereviewbyId)
module.exports = router; 

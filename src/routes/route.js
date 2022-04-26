const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const newauthorController= require("../controllers/newAuthourcontroller")
const newbookController= require("../controllers/newBookcontrollers")
const newpublisherController= require("../controllers/newPublisheercontroller")
const batchController = require("../controllers/batchController")
const devloperController = require("../controllers/devloperController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )

router.get("/getAuthorsData", authorController.getAuthorsData)

router.post("/createBook", bookController.createBook  )

router.get("/getBooksData", bookController.getBooksData)

router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
router.put("/getnewData", newbookController.getnewData)

router.post("/createnewauthour", newauthorController.createnewAuthor)
router.post("/createnewpublisher", newpublisherController.createnewPublisher)
router.post("/createnewbook", newbookController.createnewBook)
router.get("/getBooksWithAuthorandpublisher", newbookController.getBooksWithAuthorandpublisher)


router.post("/batches", batchController.createbatch)
router.post("/devlopers",devloperController.createdevloper)
router.get("/scholarship-developers",devloperController.scholarshipdevelopers)
router.get("/developers", devloperController.devlopers)
router.get("/hi", devloperController.hi)

module.exports = router;
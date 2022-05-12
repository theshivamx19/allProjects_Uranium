const reviewModel = require("../models/reviewModel")
const bookModel = require("../models/bookModels")
const Validation = require("../validators/validation");
const mongoose = require("mongoose")


const creatReview = async function(req,res) {

  try {
      const bookId = req.params.bookId
      const requestBody = req.body

      const checkBookId = await bookModel.findOne({ $and: [{ _id: bookId }, { isDeleted: false }] })

      if (!checkBookId) {
          return res.send({ status: false, msg: "Book doesnot exist" })
      }

      if (!Validation.isValidRequestBody(requestBody))
          return res.status(400).send({ status: false, massage: "request is unvalid" })

      if (!Validation.isValidField(requestBody.bookId))
          return res.status(400).send({ status: false, message: 'bookId is required!' });

      if (!Validation.isValidObjectId(bookId)) {
          return res.status(400).send({ status: false, msg: "bookId not valid" })
      }
      if (!Validation.isValidField(requestBody.reviewedBy))
          return res.status(400).send({ status: false, message: 'reviewedBy is required!' });

      if (!Validation.isValidField(requestBody.reviewedAt))
          return res.status(400).send({ status: false, message: 'reviewedAt is required!' });

      if (requestBody.reviewedAt == undefined) {
          requestBody.reviewedAt = new Date()
      }

      if (!Validation.isValidField(requestBody.rating))
          return res.status(400).send({ status: false, message: 'rating is required!' });


      const reviewCreated = await reviewModel.create(requestBody)
      let review = []
     mongoose.bookModel.findById({_id:bookId}).forEach(element => { 
         review.push()
         
     });
     

      res.status(201).send({ status: true, msg: "review created sucessfully", data: reviewCreated })

  } catch (error) {
    return res.status(500).send({ status: false, error: error.message })
  }

}


module.exports.creatReview = creatReview
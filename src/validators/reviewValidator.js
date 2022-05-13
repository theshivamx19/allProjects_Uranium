const mongoose = require("mongoose");
const reviewModel = require("../models/reviewModel")
const bookModel = require("../models/bookModels")
const commonValidator = require("./validation");

const ObjectId = mongoose.Types.ObjectId

const validateReview = async function (review) {
  if (!ObjectId.isValid(review.bookId)) {
    return "bookId not valid";
  }
  const isValidBookId = await bookModel.findOne({ $and: [{ _id: review.bookId }, { isDeleted: false }] })

  if (!isValidBookId) {
    return "Book doesnot exist";
  }
 
  if (!commonValidator.isValidField(review.rating)){
    return 'rating is required!';
  }
  if (!(review.rating >= 1 && review.rating <= 5)) {
    return "rating should be between 1 and 5"
  }

  if (review._id && !ObjectId.isValid(review._id)) {
    return "review id is not a valid object id";
  }

  return null;
}


module.exports = { validateReview };
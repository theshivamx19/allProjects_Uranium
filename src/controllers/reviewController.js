const reviewModel = require("../models/reviewModel")
const bookModel = require("../models/bookModels")
const Validation = require("../validators/validation");
const reviewValidator = require("../validators/reviewValidator");

const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const creatReview = async function (req, res) {

    try {
        const bookId = req.params.bookId
        const requestBody = req.body

        if (!Validation.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "request body is unvalid" })
        }
         // assinging a valiues in db
        const review = { bookId: bookId, reviewedAt: new Date(), ...requestBody };

        const error = await reviewValidator.validateReview(review)
        if (error) {
            return res.status(400).send({ status: false, msg: error })
        }

        /*
        if (!ObjectId.isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "bookId not valid" })
        }
        validating the bookid is present in  db and not deleted
        const isValidBookId = await bookModel.findOne({ $and: [{ _id: bookId }, { isDeleted: false }] })

        if (!isValidBookId) {
            return res.send({ status: false, msg: "Book doesnot exist" })
        }

        if (!Validation.isValidRequestBody(requestBody))
            return res.status(400).send({ status: false, massage: "request body is unvalid" })

        if (!Validation.isValidField(requestBody.reviewedBy))
            return res.status(400).send({ status: false, message: 'reviewedBy is required!' });


        if (!Validation.isValidField(requestBody.rating))
            return res.status(400).send({ status: false, message: 'rating is required!' });

        rating should be between 1 & 5
        if (!(requestBody.rating >= 1 && requestBody.rating <= 5)) {
            res.status(400).send({ status: true, mag: "rating should be between 1 and 5" })
        }
        */

        // review created
        const reviewCreated = await reviewModel.create(review)

       // const{isDeleted,createdAt,updatedAt, ...result} = reviewResult

        
        //updating a reviwe count in bookModel
        const noOfReviews = await reviewModel.find({ bookId: bookId });
        await bookModel.findOneAndUpdate({ _id: bookId }, { reviews: noOfReviews.length })

      return  res.status(201).send({ status: true, msg: "review created sucessfully", data: reviewCreated })

    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}



const reviewupdate = async function (req, res) {
    try {
        let data = req.params;
        let requestBody = req.body;

        //console.log(data);
        // ============================================valid object id ==========================================
        // if (!ObjectId.isValid(data.bookId)) {
        //     return res.status(400).send({ status: false, msg: "bookid is not a valid object id" })
        // }

        // if (!ObjectId.isValid(data.reviewId)) {
        //     return res.status(400).send({ status: false, msg: "review id is not a valid object id" })
        // }
        if (!Validation.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "request body is unvalid" })
        }

        const review = { bookId: data.bookId, _id: data.reviewId, ...requestBody };

        const error = await reviewValidator.validateReview(review)
        if (error) {
            return res.status(400).send({ status: false, msg: error })
        }

        // ===========================================data is present in database============================================

        let reviewData = await reviewModel.findOne({ $and: [{ _id: data.reviewId, bookId: data.bookId }, { isDeleted: false }] })

        if (!reviewData) return res.status(404).send({ status: false, msg: "data or review id are not correct" })

        // =============================updating review=======================================================

        if (requestBody.rating || requestBody.review || requestBody.reviewedBy) {
            let updatedreview = await reviewModel.findByIdAndUpdate(
                { _id: data.reviewId, bookId: data.bookId },
                { $set: { rating: requestBody.rating, review: requestBody.review, reviewedBy: requestBody.reviewedBy } },
                { new: true }
            )
            return res.status(201).send({ status: true, msg: "Updated data", data: updatedreview })
        }

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

const deletereviewbyId = async function(req, res){  
    try {
        //  /// check the book id  ////
        // if (req.params.bookId==undefined)
        // return res.status(400).send({status: false, msg: "invalid book request "})
        const bookId = req.params.bookId
        if (!Validation.isValidObjectId(bookId))
            return res.status(400).send({ status: false, msg: "Book id is invalid" })

        let bookExists = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookExists)
            return res.satus(404).send({ status: false, message: "book not found" })


        // //// check the review id /////
        // if (req.params.reviewId==undefined)
        // return res.status(400).send({status: false, msg: "invalid review request.plzz send the valid review "})

        const reviewId = req.params.reviewId

        if (!Validation.isValidObjectId(reviewId))
            return res.status(400).send({ status: false, msg: "PLzz required valid of review id" })

        let review = await reviewModel.findOne({ _id: reviewId, isDeleted: false });
        if (!review) {

            return res.status(404).send({ status: false, msg: "review doesn't exist!" })
        };

        await reviewModel.findByIdAndUpdate(reviewId, { $set: { isDeleted: true } });

        const noOfReviews = await reviewModel.find({ bookId: bookId, isDeleted: false });
        await bookModel.findOneAndUpdate({ _id: bookId }, { reviews: noOfReviews.length })

        //  await bookModel.findByIdAndUpdate(bookId,{$inc:{ rating : -1}});
        return res.status(200).send({ status: true, msg: "review deleted successfully!" });

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }

};

module.exports.deletereviewbyId = deletereviewbyId;

module.exports.reviewupdate = reviewupdate


module.exports.creatReview = creatReview
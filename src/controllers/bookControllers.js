const bookModel = require("../models/bookModels")
const userModel = require("../models/userModels")
const mongoose = require("mongoose")


//const jwt = require('Jsonwebtoken');
const Validation = require("../validators/validation");
//const { isValidObjectId } = require('mongoose');




const bookcreate = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!Validation.isValidRequestBody(requestBody))
            return res.status(400).send({ status: false, massage: "request is unvalid" })


        if (!Validation.isValidField(requestBody.title))
            return res.status(400).send({ status: false, message: 'title is required!' });

        let titleExist = await bookModel.findOne({ title: requestBody.title })
        if (titleExist)
            return res.status(400).send({ status: false, message: 'title is alredy exist' })


        if (!Validation.isValidField(requestBody.excerpt))
            return res.status(400).send({ status: false, message: 'excerpt is required!' });


        if (!Validation.isValidField(requestBody.userId))
            return res.status(400).send({ status: false, message: 'userId is required!' });


        if (!Validation.isValidField(requestBody.ISBN))
            return res.status(400).send({ status: false, message: 'ISBN No. is required!' });
        let ISBNexist = await bookModel.findOne({ ISBN: requestBody.ISBN })
        if (ISBNexist)
            return res.status(400).send({ status: false, message: 'ISBN no. is already exist!' })

        if (!Validation.isValidField(requestBody.category))
            return res.status(400).send({ status: false, message: 'category is required!' });


        if (!Validation.isValidField(requestBody.subcategory))
            return res.status(400).send({ status: false, message: 'subcategory is required!' });

         if(!Validation.isValidReleaseDate(requestBody.releasedAt)) {
            return res.status(400).send({ status: false, message: 'Invalid format releasedAt' });
         }  

        if (requestBody.isPublished)

            requestBody.publishedAt = new Date();

        let newBook = await bookModel.create(requestBody);
        res.status(201).send({ status: true, message: 'New book created successfully.', data: newBook });
        console.log({ status: true, data: newBook });

    }
    catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, message: error.message})
    }
}




// get books with particular fileds using query params
const getBooks = async function (req, res) {
    try {

        const query = req.query
        const { userId, category, subcategory } = query
        // user id vlidation 
        if (userId && !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ status: false, msg: "userid not valid" })
        }

        // filtering by query
        const filterdBooks = await bookModel.find({ $and: [{ isDeleted: false }, query] }).sort({title:1})
            .select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, subcategory: 1 });

        if (!filterdBooks.length) {
            return res.status(400).send({ status: false, msg: "No Book exist" })
        }
        // sorting name  by Alphabitical
        //const sortedBooks = filterdBooks.sort((a, b) => a.title.localeCompare(b.title))
         // arrr.sort()
        res.status(200).send({ status: true, msg: "all books", data: filterdBooks })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
};


const bookupdate = async function (req, res) {
    try {
        console.log(req.params);
        let bookId = req.params.bookId
        if (bookId && !(ObjectId.isValid(bookId))) return res.status(400).send({ status: false, msg: "book id is not a valid object id" })

        let bookData = await Booksmodel.findById(bookId)
        if (!bookData || bookData.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Data Not Found this bookid is not valid" })
        }
        let s = req.body
        if (!(s.title || s.excerpt || s.ISBN || s.releasedAt)) return res.status(400).send({ status: false, msg: "pls provide some data to update" })

        if (s.title || s.excerpt || s.ISBN || s.releasedAt) {
            let uptitle = await Booksmodel.findByIdAndUpdate(
                { _id: bookId },
                { $set: { title: s.title, excerpt: s.excerpt, ISBN: s.ISBN, releasedAt:s.releasedAt } },
                { new: true }
            )
            return res.status(201).send({status:true , updateddata:uptitle})
        }


    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}
module.exports = { bookupdate };

module.exports.bookcreate = bookcreate;
module.exports.getBooks = getBooks







const bookModel = require("../models/bookModels")
const userModel = require("../models/userModels")
const reviewModel = require("../models/reviewModel")
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

        if (!Validation.isValidField(requestBody.releasedAt))
            return res.status(400).send({ status: false, message: 'releasedAt is required!' });

            
        console.log(`requestBody.releasedAt is ${requestBody.releasedAt}`);
         if(!Validation.isValidReleaseDate(requestBody.releasedAt)) {
            return res.status(400).send({ status: false, message: 'Invalid format releasedAt' });
         }  

         

        if (requestBody.isPublished)

            requestBody.publishedAt = new Date();

        let newBook = await bookModel.create(requestBody);
        res.status(201).send({ status: true, message: 'New book created successfully.', data: newBook });
        //console.log({ status: true, data: newBook });

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
        const filterdBooks = await bookModel.find({ $and: [{ isDeleted: false }, query] })
            .select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1, subcategory: 1 });

        if (!filterdBooks.length) {
            return res.status(400).send({ status: false, msg: "No Book exist" })
        }
        // sorting name  by Alphabitical
        const sortedBooks = filterdBooks.sort((a, b) => a.title.localeCompare(b.title))
         

         // arrr.sort()
        res.status(200).send({ status: true, msg: "all books", data: sortedBooks })

    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
};

const getBook = async function(req, res){
    try {
    let bookId = req.params.bookId

    console.log(bookId)

    if (bookId && !mongoose.Types.ObjectId.isValid(bookId)) {
        return res.status(400).send({ status: false, msg: "bookId not valid" })
    }

    const findBook = await bookModel.findOne({$and:[{_id:bookId},{isDeleted:false}]})
    const reviewsData = await reviewModel.find({bookId:bookId})
    .select({_id:1 ,bookId:1,reviewedBy:1,reviewedAt:1,rating:1,review:1})

    const result= {
        data:findBook,
        reviewsData:reviewsData
    }

    //let findBook = await Booksmodel.find({ $and : [{ $and :[{isDeleted : false}]}, {$or : [{userId : bookData.userId}, {category : bookData.category}, {subcategory : bookData.subcategory}]}]})
        if(!findBook)
        return res.status(404).send({status : false, msg : 'No such book exist'})
    res.status(200).send({status : true ,  data: result})

    }
    catch(err){
        return res.status(500).send({status : false, error : err.message})
    }
}

const bookupdate = async function (req, res) {
    try {
        //console.log(req.params);
        let bookId = req.params.bookId
        if (bookId && !mongoose.Types.ObjectId.isValid(bookId)) return res.status(400).send({ status: false, msg: "book id is not a valid object id" })

        let bookData = await bookModel.findById(bookId)
        if (!bookData || bookData.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "Data Not Found this bookid is not valid" })
        }
        let update = req.body
        if (!(update.title || update.excerpt || update.ISBN || update.releasedAt)) return res.status(400).send({ status: false, msg: "pls provide some data to update" })

        let existTitle = await bookModel.findOne({ title: update.title })
        if (existTitle) return res.status(400).send({ status: false, msg: "this title is already exist" })


        let existISBN = await bookModel.findOne({ ISBN: update.ISBN })
        if (existISBN) return res.status(400).send({ status: false, msg: "this ISBN no. is already exist" })
        
        if (update.title || update.excerpt || update.ISBN || update.releasedAt) {
            let uptitle = await bookModel.findByIdAndUpdate(
                { _id: bookId },
                { $set: { title: update.title, excerpt: update.excerpt, ISBN: update.ISBN, releasedAt: update.releasedAt } },
                { new: true }
            )
            return res.status(200).send({ status: true, updateddata: uptitle })
        }


    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}

const deleteBookById = async function(req,res)
{
    try
    {
        if(req.params.bookId==undefined)
        
           return res.status(400).send({status : false,msg : "Invalid request parameter! Please provide bookId."});
        
        if (!Validation.isValidObjectId(req.params.bookId)) 
      
            return res.status(400).send({ status: false, message: 'Book id is invalid!' });
        
        let book = await bookModel.findOneAndUpdate({_id : req.params.bookId,isDeleted : false},{$set : {isDeleted : true,deletedAt : new Date()}});
        if(book!=null)
        {
           return res.status(200).send({status : true,msg : "Book deleted successfully!"});
        }
        else
        {
          return  res.status(404).send({status : false,msg : "Book doesn't exist!"});
        }
    }
    catch(err)
    {
       return res.status(500).send({status : false,msg : err.message});
    }
};




module.exports.bookcreate = bookcreate;
module.exports.getBooks = getBooks;
module.exports.getBook =getBook;
module.exports.bookupdate = bookupdate ;
module.exports.deleteBookById = deleteBookById






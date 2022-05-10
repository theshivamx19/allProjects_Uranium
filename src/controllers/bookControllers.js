const bookModel = require("../models/bookModels")
const userModel = require("../models/userModels")

// get books with particular fileds using query params
const getBooks = async function (req,res) {
    try {
       const queryParam =req.query
       const {userId,category,subcategory} = queryParam
        const allBooks = await bookModel.find({isDeleted: false},{_id:1},{title: 1},{expert:1},{userId:1},{category:1},{reviews:1},{releasedAt:1})
        res.status(200).send({status: true, masg:"All books", data:allBooks})
        
    } catch (error) {
        res.status(500).send({status:false ,error: error.message })
    }
};

module.exports.getBooks=getBooks
const newAuthorModel = require("../models/newAuthormodel")
const newbookModel = require("../models/newBookmodel")
const newPublisherModel = require("../models/newPublishermodel")
const createnewBook = async function (req, res) {
    let book = req.body
    let autherId = book.author
    let publisherId = book.publisher
    if (!authorId) {
        return res.send({status : false, massage:"Author id must be present"})
    }
    let author = await newAuthorModel.findById(autherId)
    if(!author){
        return res.send({massage: "not a valid author id"})
    }
    if (!publisherId) {
        return res.send({status : false, massage:"Author id must be present"})
    }
    let publisher = await newPublisherModel.findById(publisherId)
    if(!publisher){
        return res.send({massage: "not a valid publisher id"})
    }
    let createnewBook = await newbookModel.create(book)
    res.send({data : createnewBook})
}
const getnewBooksData = async function (req, res) {
    let books = await newbookModel.find()
    res.send({ data: books })
}
const getBooksWithAuthorandpublisher = async function (req, res) {
    let specificBook = await newbookModel.find().populate("author_id").populate("publisher_id")
    res.send({data: specificBook})
    

}
const getnewData = async function (req, res) {
    let ishardcoverpublisher = await newPublisherModel.find({})
    
     
    res.send({ msg: savedData })
  };

module.exports.getnewData = getnewData
module.exports.createnewBook = createnewBook
module.exports.getnewBooksData = getnewBooksData
module.exports.getBooksWithAuthorandpublisher = getBooksWithAuthorandpublisher

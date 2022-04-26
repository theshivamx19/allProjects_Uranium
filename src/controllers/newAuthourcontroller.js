const newAuthorModel= require("../models/newAuthormodel.js")

const createnewAuthor= async function (req, res) {
    let author = req.body
    let newauthor = await newAuthorModel.create(author)
    res.send({data: newauthor})
}

const getnewAuthorsData= async function (req, res) {
    let authors = await newAuthorModel.find()
    res.send({data: authors})
}

module.exports.createnewAuthor= createnewAuthor
module.exports.getnewAuthorsData= getnewAuthorsData
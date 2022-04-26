const newPublisherModel= require("../models/newPublishermodel")

const createnewPublisher= async function (req, res) {
    let author = req.body
    let authorCreated = await newPublisherModel.create(author)
    res.send({data: authorCreated})
}

const getnewPublisher= async function (req, res) {
    let authors = await newPublisherModel.find()
    res.send({data: authors})
}

module.exports.getnewPublisher= getnewPublisher
module.exports.createnewPublisher= createnewPublisher
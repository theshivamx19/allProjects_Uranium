const batchModel= require("../models/batchModel")
/*
1. Write an api POST /batches that creates a batch from the details in the request body. Please note that the
 program should be an enum with the following allowed values only - backend and frontend

*/
const createbatch= async function (req, res) {
    let batch = req.body
    let batchCreated = await batchModel.create(batch)
    res.send({data: batchCreated})
}

module.exports.createbatch= createbatch



const blogModel = require('../models/authorModel')
const authorModel = require('../models/blogModel')
const  createblog = async function(req,res){
    try{
        let author = req.body
        if(Object.keys(author) !=0){
            let createauther = await authorModel.create(author)
            res.status(201).send({msg:createauther})
        }
        else{
            res.status(400).send({msg:"bad requuest"})
        }
    }
    catch(err){
        console.log(err.massage)
        res.status(500).send({msg:"error",error:err.massage})
    }
}



module.exports.createblog= createblog
const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
const  createblog = async function(req,res){
    try{
        let blog = req.body
        let autherId = blog.autherid
        if (!authorId) {
            return res.status(401).send({status : false, massage:"Author id not present in blog"})
        }
        let author = await authorModel.findById(autherId)
        if(!author){
            return res.status(401).send({massage: "Invalid author id"})
        }
        let createblog = await blogModel.create(blog)
        if(createblog){
            res.status(201).send({massage:"succesful blog creation",data:createblog})
        }
        else{
            res.status(400).send({error:"invalid request"})
        }
    }
    catch(err){
        console.log(err.massage)
        res.status(500).send({msg:"error",error:err.massage})
    }
}



module.exports.createblog= createblog
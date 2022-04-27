const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')
const  createblog = async function(req,res){
    try{
        let blog = req.body
        let authorId = blog.authorid
        if (!authorId) {
            return res.status(401).send({status : false, massage:"Author id not present in blog"})
        }
        let author = await authorModel.findById(authorId)
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
        res.status(500).send({msg:"error",error:err.message})
    }
}
const blogData = async function (req, res) {
    try {
        let filters = req.query
        let filters1 = {}
        let {authorid, category, tags, subCategory} = filters
        if(authorid){
            filters1.authorid= authorid 
        }
        if(category){
            filters1.category= category 
        }
        if(tags){
            console.log(tags)
            filters1.tags= {$in:tags} 
        }
        if(subCategory){
            filters1.subCategory= subCategory 
        }
        filters1.isDeleted = false 
        console.log(filters1)
        let blogList = await blogModel.find(filters1)
        
        // let byAuthorId = req.query.authorId
        // let byCategory = req.query.category
        // let bytag = req.query.tag
        // let bySubCategory = req.query.subCategory

        // let blogList = await blogModel.find({ $or : [{ authorId :byAuthorId}, {category: byCategory }, { tag: bytag }, { subCategory: bySubCategory }],  $and : [{isPublished : true}, {isDeleted : false}]})
        // console.log(blogList)
        
        if (blogList) {
            res.status(200).send({ msg: blogList })
        }
        else {
            res.status(404).send({ msg: "error" })
        }
    }

    catch (err) {
        
        res.status(500).send({ msg: "error", error: err.message })
    }
}


module.exports.createblog= createblog
module.exports.blogData = blogData 
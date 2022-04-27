
const deleteModel = require('../models/blogModel')

const  deleteBlogparams = async function(req,res){
    try{
        let category = req.query.category
        let authorid = req.query.authorid
        let tag = req.query.tag
        let subcategory  = req.query.subcategory
        let unpublished = req.query.unpublished

        let paramBlogData = req.query;
    
        if(Object.keys(paramBlogData) !=0){
            let blogParams = await deleteModel.find(paramBlogData)
            if(!blogParams) {
                return res.send({status: false, message: "no such blog exists"})
            }
            let deleteBlog = await deleteModel.findOneAndUpdate({paramBlogData: blogParams}, {isDeleted: true}, {new: true})
            res.send({status: true, data: deleteBlog})
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

module.exports.deleteBlogparams = deleteBlogparams
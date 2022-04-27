
const deleteModel = require('../models/blogModel')

const  deleteBlogId = async function(req,res){
    try{
        let blogId = req.params.blogId
        if(Object.keys(blogId) !=0){
            let blog = await deleteModel.findById(blogId)
            if(!blog) {
                return res.send({status: false, message: "no such blogId  exists"})
            }
            let deleteBlog = await deleteModel.findOneAndUpdate({_id: blogId}, {isDeleted: true}, {new: true})
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

module.exports.deleteBlogId = deleteBlogId
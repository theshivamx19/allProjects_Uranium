
// const deleteModel = require('../models/blogModel')

// const deleteBlogById = async (req, res)=> {
//   try {
//    let blogId = req.params.blogId;
//     if(!blogId) return res.status(400).send({status:false,msg:"BlogId is required"})
  
//     let data = await deleteModel.findById(blogId);
//     if (!data)  return res.status(404).send({ status: false, msg: "No such blog found" });

//     if (data.isDeleted)  return res.status(404).send({ status: false, msg: " Already deleted blog Or Blog not exists" });

//     let timeStamps = new Date();
//     await deleteModel.findOneAndUpdate({_id:blogId},{$set: {isDeleted:true, deletedAt: timeStamps}},{new:true})
//     res.status(200).send({status:true,msg:"Blog is deleted successfully"})
//   } catch (err) {
//     res.status(500).send({ status: false, error: err.message });
//   }
// };

// module.exports.deleteBlogById = deleteBlogById
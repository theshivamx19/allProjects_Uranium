
// const deleteModel = require('../models/blogModel')

// const deleteBlogsByParams = async (req, res) =>{
//     try{
//       let data = req.query;
//       if(Object.keys(data).length == 0) return res.send({ status: false, msg: "Error!, Details are needed to delete a blog" });
  
//       let timeStamps = new Date();
  
//       let deletedBlog = await deleteModel.updateMany( 
//         {$and: [ {$and: [{isDeleted: false}, {isPublished: true}]}, {$or: [ {authorid: data.authorid}, {category: {$in: [data.category]}}, {tags: {$in: [data.tags]}}, {subcategory: {$in: [data.subcategory]}} ] } ]},
//         {$set: {isDeleted: true, deletedAt: timeStamps}},
//         {new: true}, 
//       )
      
//       if(deletedBlog.modifiedCount == 0) return res.status(400).send({ status: false, msg: "No such blog exist or might have already been deleted" })
  
//       res.status(200).send({ status: true, msg: "The blog has been deleted successfully" });
//     } catch (err) {
//       res.status(500).send({ status: false, error: err.message });
//     }
//   }

// module.exports.deleteBlogsByParams = deleteBlogsByParams
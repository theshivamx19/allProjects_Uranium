
//const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')

const getBlogs = async (req, res) => {
    try {
      let {...data} = req.query
  
      if(Object.keys(data).length == 0){
        let getAllBlogs = await blogModel.find({ isDeleted: false, isPublished: true });
  
        if(getAllBlogs.length == 0) return res.status(400).send({ status: false, msg: "No such blog exist" });
        return res.status(200).send({ status: true, data: getAllBlogs })
      }
  
      let getBlogs = await blogModel.find( {$and: [ {$and: [{isDeleted: false}, {isPublished: true}]}, {$or: [ {authorid: data.authorid}, {category: {$in: [data.category]}}, {tags: {$in: [data.tags]}}, {subcategory: {$in: [data.subcategory]}} ] } ]} );
  
      if(getBlogs.length == 0) return res.status(200).send({ status: true, msg: "No such blog exist" });
      res.status(200).send({ status: true, data: getBlogs })
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }

module.exports.getBlogs = getBlogs

const authorModel = require('../models/authorModel')
const blogModel = require('../models/blogModel')


const createBlog = async (req, res) => {
    try {
      let getData = req.body;
      if (Object.keys(getData).length == 0) return res.status(400).send({ status: false, msg: "Data is required to create a Blog" });
  
      let getAuthorData = await authorModel.findById(getData.authorid);
      if(!getAuthorData) return res.status(404).send({ status: false, msg: "No such author exist" });
  
      let showBlogData = await blogModel.create(getData);
      res.status(201).send({ status: true, data: showBlogData });
    } catch (err) {
      res.status(500).send({ status: false, error: err.message });
    }
  }


module.exports.createBlog= createBlog












const jwt = require('jsonwebtoken');
const blogModel = require('../models/blogModel');

const authencation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["x-Api-Key"];
        if (!token) token = req.headers["X-Api-Key"];
        //If no token is present in the request header return error
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        console.log(token);
        let decodedToken = jwt.verify(token, "functionup-uranium");
        // console.log(decodedToken)
        if (decodedToken) { next() }
        else{
            return res.status(400).send({msg:"Invalid token"})
        }
    }
    catch (err) {
        res.status(500).send(err)
    }
}
const authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["x-Api-Key"];

        //If no token is present in the request header return error
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
        console.log(token);
        let decodedToken = jwt.verify(token, "functionup-uranium");
        console.log(decodedToken)
        if (!decodedToken) {
            return res.status(400).send({ status: false, msg: "token is invalid" })
        }

        let blogId = req.params.blogId
        let blog = await blogModel.findById(blogId)
        console.log(blog)
        if (!blog) {
            return res.status(404).send({ status: "false", msg: "No such blog exists" })
        };
        let blogAuthor = blog.authorid
        let decodeAuthorid = decodedToken.authorid;

        if(blogAuthor != decodeAuthorid ){
            return res.status(401).send({msg:"you have not authorisation "})
        }
        next()
    }
    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}

module.exports.authencation = authencation
module.exports.authorisation = authorisation

const authorModel = require('../models/authorModel');
const jwt = require('jsonwebtoken');
const blogModel = require('../models/blogModel');

const authentication = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["x-Api-Key"];

        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        console.log(token);


        let decodedToken = jwt.verify(token, "functionup-uranium");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "token is invalid" })

        req.authorid = decodedToken.authorid
        console.log(req.authorid)
        next()

    }


    catch (err) {
        console.log("This is the error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }

};








module.exports.authentication = authentication

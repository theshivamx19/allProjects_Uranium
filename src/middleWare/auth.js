










const authorModel = require('../models/authorModel');
const jwt = require('jsonwebtoken')
const authencation = async function (req, res, next) {
    // let token = req.headers["x-api-key"];
    // if (!token) token = req.headers["x-Api-Key"];
    // if (!token) token = req.headers["X-Api-Key"];

    // //If no token is present in the request header return error
    // if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    // console.log(token);


    // let decodedToken = jwt.verify(token, "functionup-uranium");
    // console.log(decodedToken)
    // if (!decodedToken){
    //     console.log("token is not valid")
    //     return res.status(400).send({ status: false, msg: "token is invalid" });
    // }



    //     next();
    // }
    try {
        let token = req.headers["x-api-key"];
        if (!token) token = req.headers["x-Api-Key"];

        //If no token is present in the request header return error
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        // console.log(token);


        let decodedToken = jwt.verify(token, "functionup-uranium");
        //console.log(decodedToken)
        // if (!decodedToken){
        //     return res.status(400).send({ status: false, msg: "token is invalid" })
        // }
        next()
    }
    catch (err) {

        res.status(500).send({ msg: "Error", error: err.message })
    }
}


// const authencation = async function (req, res, next) {
//     try {
//         let token = req.headers["x-api-key"];
//         if (!token) token = req.headers["x-Api-Key"];
//         if (!token) token = req.headers["X-Api-Key"];

//         //If no token is present in the request header return error
//         if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

//         console.log(token);


//         let decodedToken = jwt.verify(token, "functionup-uranium");
//         if (!decodedToken)
//             return res.status(400).send({ status: false, msg: "token is invalid" });

//         let authorId = req.params.blogid;
//         let authorDetails = await authorModel.findById(authorId);
//         console.log(authorDetails)
//         if (!authorDetails) {
//             return res.status(404).send({ status: "false", msg: "No such author exists" })
//         };

//         return res.status(200).send({ status: true, data: authorDetails });
//         next()
//     }
//     catch (err) {
//         console.log("This is the error :", err.message)
//         res.status(500).send({ msg: "Error", error: err.message })
//     }

// };
const authorise = function (req, res, next) {
    let token = req.headers["x-api-key"];
    if (!token) token = req.headers["x-Api-Key"];
    if (!token) token = req.headers["X-Api-Key"];
    if (!token) return res.send({ status: false, msg: "token must be present" });
    //console.log(token);
    let decodedToken = jwt.verify(token, "functionup-uranium");
    let authorToBeModified = req.params.authorId;
    let authorLoggedIn = decodedToken.authorId;
    if (authorToBeModified != authorLoggedIn)
        return res.status(403).send({ status: false, msg: 'author logged is not allowed to modify the requested users data' })
    //if (!decodedToken)
    //return res.send({ status: false, msg: "token is invalid" });
    next()
}



module.exports.authencation = authencation
module.exports.authorise = authorise
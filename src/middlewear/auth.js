const jwt = require('jsonwebtoken');
const blogModel = require('../Model/blogModel');

const authentication = async function (req, res, next) {
    try {

        //Reading token
        let token = req.headers["x-Api-Key"];
        //check lowercase
        if (!token) token = req.headers["x-api-key"]

        //if token not found
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token must be present" })
        }

        //Token validation
        validToken = !/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(token)

        if (validToken) {
            return res.status(400).send({ status: false, msg: "Invalid token" })
        }


        //if token found
        let decode = jwt.verify(token, "group40-phase2");
        
        //if token is not valid
        if (!decode) {
            return res.status(401).send({ status: false, msg: "Invalid Token" })
        }

        
        next()

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });

    }
}


const authorize = async function (req, res, next) {
    try {
        let token = req.headers["x-Api-Key"];
        // //check lowercase for token
        if (!token) token = req.headers["x-api-key"]

        //If token not found
        if (!token) {
            return res.status(401).send({ status: false, msg: "Token must be present" })
        }
        //if token found then decode token using secret key
        let decode = jwt.verify(token, "group40-phase2");

        //if token is not valid
        if (!decode) {
            return res.status(403).send({ status: false, msg: "Invalid Token" })
        }

        //Reading authorId from decoded token
        let loggedAuthorId = decode.authorId

        //<<<<<<<<<--------genius rafi----------->>>>>>>>>>
        // category, authorid, tag name, subcategory name, unpublished
        let isValid = false;
        //Reading id from path params
        let id = req.params.blogId
        if (id) {

            //validate blogId
            let validid = !/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(id)
            if (validid) {
                return res.status(400).send({ status: false, msg: "enter valid blogId" })
            }

            let auth = await blogModel.findById({ _id: id })
           
            if (!auth) {
                return res.status(404).send({ status: false, msg: "blog doesnt exist" })
            }

            isValid = loggedAuthorId == auth.authorId;//true or false
         
        }

        let queryparam = req.query
        const { category, authorId, tags, subcategory, isPublished } = queryparam//destructuring
      
        if (Object.keys(queryparam) != 0) {
            const queryparam = req.query;
           

            if (authorId) {
                //validate authorId
                let validid = !/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(authorId)
                if (validid) {
                    return res.status(400).send({ status: false, msg: "enter valid authorId" })
                }
            }

            const blogs = await blogModel.find(queryparam);
            if(!blogs){
                return res.send({ status: false, msg: "Blog does not exist" })
            }
            isValid = blogs.some(blog => blog.authorId == loggedAuthorId)//true or false
        }

        console.log(isValid)
        //if logged in author and author who is making changes are not same. then authorization failed
        if (!isValid) {
            return res.send({ status: false, msg: "Author not allowed" })
        }

        //if logged in and author making changes are same then auth. successful and move next function 
        next()

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}

//export function
module.exports.authorize = authorize

//export function
module.exports.authentication = authentication
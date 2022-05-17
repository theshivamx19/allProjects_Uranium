const jwt = require('jsonwebtoken')
const bookModel = require("../models/bookModels")

const validateToken = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token)
            token = req.headers['x-Api-Key']
        //checking token is present or not
        if (!token) return res.status(400).send({ status: false, msg: 'Token must be present' })
        //decoding token
        let decodedToken = jwt.verify(token, 'group-17', { ignoreExpiration: true})
        //console.log(decodedToken)
        const expiryDate = new Date(decodedToken.exp * 1000);
        console.log(`expiryDate is ${expiryDate} - current time ${new Date()}`)
        if(expiryDate < new Date()){
            return res.status(400).send({ status: false, msg: 'Token is expired.' })
        }
        if (!decodedToken) 
        {
            return res.send({ status: false, msg: 'Invalid Token' })
        }
        req.headers['userId'] = decodedToken.userId;
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const authorisation = async function (req, res, next) {
    try {
        const tokenUserId = req.headers.userId;
        //book id for edit and delete
        let bookId = req.params.bookId;
        let book = await bookModel.findById(bookId)
        //console.log(`book user Id ${book.userId} - req.body.userId ${req.body.userId}`)

        //if book id is there then we can treat as edit/delete or create
        // let testBookUserId = null
        // if(req.method === 'PUT' || req.method === 'DELETE'){
        //     testBookUserId = book.userId
        // } else if (req.method == 'POST'){
        //     testBookUserId = req.body.userId;
        // } 
        //OR
        const bookUserId = book?.userId ?? req.body.userId
        if(bookUserId != tokenUserId){
            return res.status(400).send({ status: false, msg: 'You are not authorized user' })
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports.validateToken = validateToken
module.exports.authorisation = authorisation;
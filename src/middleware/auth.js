const authentication = (req, res, next) => {
    const token = req.headers
    console.log(token)
}


const authorization = (req, res, next) => {

}



module.exports = {
    authentication,
    authorization
}
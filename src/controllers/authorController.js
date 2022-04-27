const authorModel =  require('../models/authorModel')
const  createAuther = async function(req,res){
    try{
        let author = req.body
        if(Object.keys(author) !=0){
            let createauther = await authorModel.create(author)
            res.status(201).send({msg:createauther,mas:"succesful a author"})
        }                                                       
        else{
            res.status(400).send({msg:"bad requuest"})
        }
    }
    catch(Error){
       
        res.status(500).send({msg:Error.message})
    }
}




module.exports.createAuther = createAuther
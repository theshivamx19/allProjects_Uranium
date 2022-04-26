const authorModel =  require('../models/authorModel')

const  createAuther = async function(req,res){
    try{
        let author = req.body
        if(Object.keys(author) !=0){
            let createauther = await authorModel.create(author)
            res.status(201).send({msg:createauther})
        }
        else{
            res.status(400).send({msg:"bad requuest"})
        }
    }
    catch(err){
        console.log(err.massage)
        res.status(500).send({msg:"error",error:err.massage})
    }
}




module.exports.createAuther = createAuther
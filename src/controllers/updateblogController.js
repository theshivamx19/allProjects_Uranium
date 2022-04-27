const blogModel = require('../models/blogModel')
//kjvkjhfhoiihgkjh











const putPublished = async function (req, res) {
    try {
        let blogid = req.params.blogId;
        if (!blogid) {
            return res.status(400).send({ status: "false", data: "blogid not exist" })
        }
        let person = await blogModel.findById(blogid);
        console.log(person)
        if (!person) {
            return res.status(400).send({ status: "false", data: "the blogid is not valit" })
        }
        let published = person.isPublished
        if (published == false) {
            let result = await blogModel.findOneAndUpdate({ _id: person._id }, { $set: ({ isPublished: true ,  publishedAt: Date.now() }) }, { new: true })
            res.send({ data: result })
        } else {
            res.send({ msg: "blog is already published" })
        }
    }
    catch (err) {
        console.log(err.massage)
        res.status(500).send({ msg: "error", error: err.massage })
    }
}

module.exports.putPublished = putPublished


// const putupdateblog = async function(req, res){
// let blogid = req.params.blogId
// let object = req.body


// let person = await blogModel.findById(blogid);
// if(!person){
//     return res.status(400).send({status:"false",data:"the blogid is not valit"})

// }
// let adtag = person.tags
// let push1 = object.tags
//       let news =adtag.push(push1)
// let updateblog = await blogModel.findByIdAndUpdate({_id:person._id},object, {new:true})

// //  let adtag = person.tags
// // let push = object.tags
//     //   adtag.push(push)
//  res.send({data:updateblog})





// }
 
// const putPublished = async function(req , res){

//     let blogid = req.params.blogId;
//     let person = await blogModel.findById(blogid);
//     console.log(person)
// if(!person){
//     return res.status(400).send({status:"false",data:"the blogid is not valit"})

// }
// let published = person.isPublished
// if(published==false){
//     let result = await blogModel.findOneAndUpdate({_id:person._id},{$set:({isPublished:true},{publishedAt:Date.now()})},{new:true})

// res.send({data:result})

// }else{
//     res.send({msg :"blog is already published"})
// }



// }



// module.exports.putupdateblog = putupdateblog
// module.exports.putPublished = putPublished

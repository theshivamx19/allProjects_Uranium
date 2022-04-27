const blogModel = require('../models/blogModel')












const putPublished = async function (req, res) {
    try {
        let blogid = req.params.blogId;
        let body = req.body
        if (!blogid) {
            return res.status(400).send({ status: "false", data: "blogid not present" })
        }
        let person = await blogModel.findById(blogid);
        console.log(person)
        if (!person) {
            return res.status(400).send({ status: "false", data: "the blogid is not valit" })
        
        }
           let isDelet = person.isDeleted;
           if(isDelet== true){
             return  res.status(400).send({msg:false,data:"blog document has deleted"})
           }
        let published = person.isPublished
        if (published == false && Object.keys(body) == 0 ) {

            let result = await blogModel.findOneAndUpdate({ _id: person._id },{isPublished:true,publishedAt:Date.now()}, { new: true })
            res.status(200).send({data:result})}
            else if(published == false && Object.keys(body) != 0){
                let result = await blogModel.findOneAndUpdate({ _id: person._id },body, { new: true })
                res.status(200).send({data:result})
            }else{
                let result = await blogModel.findOneAndUpdate({ _id: person._id },body, { new: true })
                res.status(200).send({data:result})
            }

        }
        catch (err) {
            console.log(err.message)
            res.status(500).send({ msg: "error", error: err.message })
        }
    }
    
    module.exports.putPublished = putPublished
    
        // let published = person.isPublished
        // if (published == false  ){
        // let result = await blogModel.findOneAndUpdate({ _id: person._id },{{body},isPublished:true}}, { new: true })
        // res.send({data:result})
        // // let published = person.isPublished
        // // if (published == false && Object.key(body) == 0 ) {
        //     // let object = req.body
        //     let result = await blogModel.findOneAndUpdate({ _id: person._id }, {isPublished:true,  publishedAt: Date.now() }, { new: true })
        //     return res.send({ data: result })
        // // } else 

        //    return res.send({ msg: "blog is already published" }
        // }
//     }
//     catch (err) {
//         console.log(err.message)
//         res.status(500).send({ msg: "error", error: err.message })
//     }
// }

// module.exports.putPublished = putPublished







 // let published = person.isPublished
        // if (published == false  ){
        // let result = await blogModel.findOneAndUpdate({ _id: person._id },{{body},isPublished:true}}, { new: true })
        // res.send({data:result})
        // // let published = person.isPublished
        // // if (published == false && Object.key(body) == 0 ) {
        //     // let object = req.body
        //     let result = await blogModel.findOneAndUpdate({ _id: person._id }, {isPublished:true,  publishedAt: Date.now() }, { new: true })
        //     return res.send({ data: result })
        // // } else 

        //    return res.send({ msg: "blog is already published" }
        // }

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

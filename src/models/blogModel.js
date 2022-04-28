const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({

title: {
    type:String,
    required:true
},
 
body: {
     type:String,
     required:true
    },
authorid:String,
authorId:{
    type: ObjectId,
    ref:"Author"
},
tags: [{
    type: String
}],
category: {
    type: String,
    required: true,
},
subcategory: [{
    type: String
}],

deletedAt :{
    type:Date,
    default: Date.now
},

isDeleted: {
    type:Boolean, 
    default: false
},
publishedAt:{
    type:Date,
    default: Date.now()
},  
isPublished: {
    type: Boolean,
    default: false
}
},{timestamps:true})
module.exports = mongoose.model("Blog", blogSchema)
const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema({

title: {
    type:string,
    required:true
},
 
body: {
     type:string,
     required:true
    },

authorId:{
    type: ObjectId,
    ref:"Author"
},

tags: [string],

category: {
    type: string,
    required: true,
},
sDeleted: {
    type:boolean, 
    default: false
},
     
publishedAt: {
         
    type : Date.now()
     
}, 
     
isPublished: {

    type: boolean,
    default: false
},

subcategory: ["technology", "entertainment", "life style", "food", "fashion"],

},{timestamps:true})

module.exports = mongoose.model("Blog", blogSchema)
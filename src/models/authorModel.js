const mongoose = require('mongoose');
const validator = require('validator')
const authorSchema = new mongoose.Schema({
    fname : {
        type:String,
        required:true 
    },
    lname : {
        type:String,
        required:true 
    },
    title : {
        type:String,
        required:true,
        enum:["Mr","Mrs","Miss"]
    },
    // email: {
    //     type:String,
    //     required:true,
    //     unique:true ,
        
        // validator: function (v) {
        //     return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        // }

    email : {
        type:String,
        required:true,
        unique:true ,
<<<<<<< HEAD
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },

            message: "Please enter a valid email"

        },

    },
=======
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
     },
>>>>>>> 473a7e145b4cefb76ef26e6cb5be8141e7c318dc
    password : {
        type:String,
        required:true,
    },
},{timestamps:true})

module.exports = mongoose.model("Author", authorSchema)
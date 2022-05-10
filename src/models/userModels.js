const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    { 
        name : { 
                    type: String, 
                    required: true 
                }, 
        phone : { 
                    type: String, 
                    required: true,
                    unique: true
                }, 
        title : { 
                    type: String, 
                    enum: ["Mr", "Mrs", "Miss"], 
                    required: true 
                }, 
        email : { 
                    type: String, 
                    required: true, unique: true,
                    lowercase : {require : true} 
                }, 
        password :  { 
                       type: String,
                        minlength: 8,
                         maxlength: 15,
                          required: true,
                       
                },
        address: {
                      street: String,
                      city: String,
                        pincode: String
                      }
    },{ timestamps : true }
);

module.exports = mongoose.model('User',userSchema);


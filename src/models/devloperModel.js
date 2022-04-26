const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId
const devloperSchema = new mongoose.Schema( {
    name: String,
    gender: {
        type: String,
        enum: ["male", "female","other"] 
    },
    percentage:Number,
    batch:{
        type: ObjectId,
        ref:"Batch"
    }
}, { timestamps: true });
module.exports = mongoose.model('Devloper', devloperSchema)

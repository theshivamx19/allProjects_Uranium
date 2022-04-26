const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const newbookSchema = new mongoose.Schema( {
    name: String,
    author_id: {
        type: ObjectId,
        ref: "NewAuthor"
    },
    price: Number,
    ratings: Number,
    HardCover:{type: Boolean, default: false}, 
    publisher_id: {
        
        type: ObjectId,
        ref: "NewPublisher"
    }
}, { timestamps: true });


module.exports = mongoose.model('NewBook', newbookSchema)


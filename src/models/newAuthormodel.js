const mongoose = require('mongoose');

const newauthorSchema = new mongoose.Schema( {
    authorName: String,
    age:Number,
    address: String,
    rating:Number
}, { timestamps: true });

module.exports = mongoose.model('NewAuthor', newauthorSchema)

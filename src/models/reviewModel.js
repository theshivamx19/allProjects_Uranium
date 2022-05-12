const mongoose = require("mongoose")
const objectId = mongoose.Schema.Types.ObjectId


const reviewSchema = new mongoose.Schema({


    bookId: { type: objectId, required: true, ref: "book", trim: true },
    reviewedBy: { type: String, required: true, default: 'Guest', value: { type: String } },
    reviewedAt: {type: Date, required: true },
    rating: { type: Number, required: true },
    review: { type: String },
    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true }


);

module.exports = mongoose.model("review",reviewSchema)
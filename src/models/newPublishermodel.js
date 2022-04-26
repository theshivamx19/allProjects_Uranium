const mongoose = require('mongoose');

const newpublisherSchema = new mongoose.Schema( {
    name: String,
    headQuarter: String,
}, { timestamps: true });

module.exports = mongoose.model('NewPublisher', newpublisherSchema)

const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
    // _id: Schema.Types.ObjectId,
    title: String,
    description: String,
    date: Date,
    cost: Number,
    // author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    // tags: [
    //     { type: Schema.Types.ObjectId, ref: 'Tag' }
    // ]
});

module.exports = mongoose.model('Certificate', certificateSchema);

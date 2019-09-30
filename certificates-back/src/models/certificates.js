const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    tags: [String]
});

module.exports = mongoose.model('certificate', certificateSchema);


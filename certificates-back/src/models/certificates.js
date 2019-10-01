const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    cost: {type: Number, required: true},
    tags: [{ type: String,  unique: true }],
    owners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'user'
        }
    ]
});

module.exports = mongoose.model('certificate', certificateSchema);


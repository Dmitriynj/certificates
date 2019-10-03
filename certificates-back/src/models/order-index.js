const mongoose = require('mongoose');

const orderIndexSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    index: Number,
    certificate:  {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'certificate'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
});

module.exports = mongoose.model('order-index', orderIndexSchema);

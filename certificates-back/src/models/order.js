const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('order', orderSchema);

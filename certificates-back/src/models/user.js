const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true
    },
});

module.exports = mongoose.model('user', userSchema);


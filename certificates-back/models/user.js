const mongoose = require('mongoose');

const user = mongoose.model('user', new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        email: String,
        password: String,
        role: {
            type: String,
            enum: ['ADMIN', 'USER'],
            required: true
        },
    }
));

module.exports = {
    user: user
};


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

userSchema.virtual('certificates', {
    ref: 'certificate',
    localField: '_id',
    foreignField: 'owners'
});

module.exports = mongoose.model('user', userSchema);


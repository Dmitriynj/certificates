const mongoose = require('mongoose');

const userCertificates = mongoose.model('user_certificate', mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'certificate'
    },
}));

module.exports = {
  userCertificate: userCertificates
};




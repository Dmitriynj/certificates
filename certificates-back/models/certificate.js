const mongoose = require('mongoose');

const certificate = mongoose.model('certificate', {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    date: String,
    description: String,
    cost: Number,
    tags: [String]
});

module.exports = {
  certificate: certificate
};

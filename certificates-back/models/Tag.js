const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
    name: String
});

module.exports = mongoose.model('Tag', tagSchema);

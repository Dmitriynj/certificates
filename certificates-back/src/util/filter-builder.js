const mongoose = require('mongoose');

module.exports = {
    filterWithCertificate: (filterProps, userId) => {
        let filter = {};

        if (filterProps && filterProps.title) {
            filter["certificate.title"] = {$regex: filterProps.title, $options: 'i'};
        }
        if (filterProps && filterProps.tags && filterProps.tags.length > 0) {
            filter["certificate.tags"] = {$all: [...filterProps.tags]};
        }
        if (filterProps && filterProps.my) {
            filter["certificate.owners"] = {$in: [mongoose.Types.ObjectId(userId)]}
        }

        return filter;
    },
    filter1: (filterProps, userId) => {
        let filter = {};
        if (filterProps && filterProps.input) {
            filter.title = {$regex: filterProps.input, $options: 'i'};
        }
        if (filterProps && filterProps.tags && filterProps.tags.length > 0) {
            filter.tags = {$all: [...filterProps.tags]};
        }
        if (filterProps && filterProps.my) {
            filter.owners = mongoose.Types.ObjectId(userId);
        }
        return filter;
    },

};

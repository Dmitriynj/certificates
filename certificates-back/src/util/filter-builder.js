const mongoose = require('mongoose');

module.exports = {
    buildFilter: (filterProps, userId) => {
        let filter = {};

        if (filterProps && filterProps.input) {
            filter['certificate.title'] = {$regex: filterProps.input, $options: 'i'};
        }
        if (filterProps && filterProps.tags && filterProps.tags.length > 0) {
            filter['certificate.tags'] = {$all: [...filterProps.tags]};
        }
        if (filterProps && filterProps.my) {
            filter['orders.user'] = mongoose.Types.ObjectId(userId);
        }
        return filter;
    },
};

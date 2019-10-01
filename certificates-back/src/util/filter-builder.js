const mongoose= require('mongoose');

module.exports = (filterProps, userId) => {
    let filter = {};
    if (filterProps && filterProps.input) {
        filter.title = {$regex: filterProps.input, $options: 'i'};
    }
    if (filterProps && filterProps.tags && filterProps.tags.length > 0) {
        filter.tags = {$all: [...filterProps.tags]};
    }
    if(filterProps && filterProps.my) {
        filter.owners = mongoose.Types.ObjectId(userId);
    }
    return filter;
};

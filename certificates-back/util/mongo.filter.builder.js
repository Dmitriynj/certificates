module.exports = (filterProps) => {
    let filter = {};
    if (filterProps && filterProps.input) {
        filter.title = {$regex: filterProps.input, $options: 'i'};
    }
    if (filterProps && filterProps.tags && filterProps.tags.length > 0) {
        filter.tags = {$all: [...filterProps.tags]};
    }
    return filter;
};

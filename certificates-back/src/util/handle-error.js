const HttpStatus = require('http-status-codes');

module.exports = function handleError(error, response) {
    console.log(error);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error });
};

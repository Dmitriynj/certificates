const HttpStatus = require('http-status-codes');

module.exports = function handleCatch(error, response) {
    console.log(error);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: error});
};

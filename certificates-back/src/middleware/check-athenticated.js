const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../config/token').secret;
const HttpStatus = require('http-status-codes');

module.exports = (request, response, next) => {
    if(!request.header('Authorization')) {
        console.log('Please make sure that your request ' +
            'has an Authorization header');
        return response.status(HttpStatus.UNAUTHORIZED).send({
            message: 'Please make sure that your request ' +
                'has an Authorization header',
        });
    }

    let token = request.header('Authorization').split(' ')[1];
    let payload = jwt.decode(token, secret);
    if(payload.exp <= moment.unix()) {
        console.log('Token has expired');
        return response.status(HttpStatus.UNAUTHORIZED).send({
            message: 'Token has expired'
        });
    }
    request.userId = payload.sub;
    request.userRole = payload.userRole;

    next();
};

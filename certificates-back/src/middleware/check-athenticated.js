const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../config/token').secret;

module.exports = (request, response, next) => {
    if(!request.header('Authorization')) {
        return response.status(401).send({
            message: 'Please make sure that your request ' +
                'has an Authorization header',
        });
    }

    let token = request.header('Authorization').split(' ')[1];
    let payload = jwt.decode(token, secret);
    if(payload.exp <= moment.unix()) {
        return response.status(401).send({
            message: 'Token has expired'
        });
    }
    request.userId = payload.sub;
    next();
};

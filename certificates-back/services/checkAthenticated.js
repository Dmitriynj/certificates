const jwt = require('jwt-simple');
const moment = require('moment');

module.exports = (request, response, next) => {
    if(!request.header('Authorization')) {
        return response.status(401).send({
            message: 'Please make sure that your request ' +
                'has an Authorization header',
        });
    }

    let token = request.header('Authorization').split(' ')[1];
    let payload = jwt.decode(token, 'mySecretString');
    if(payload.exp <= moment.unix()) {
        return response.status(401).send({
            message: 'Token has expired'
        });
    }

    request.user = payload.sub;
    next();
};

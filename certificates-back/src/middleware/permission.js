const HttpStatus = require('http-status-codes');

module.exports = (...allowed) => {
    const isAllowed = (role) => {
        return allowed.indexOf(role) > -1;
    };

    return (request, response, next) => {
        if (request.userId && isAllowed(request.userRole))
            next(); // role is allowed, so continue on the next middleware
        else {
            response.status(HttpStatus.FORBIDDEN).json({message: "Forbidden"}); // user is forbidden
        }
    }
};

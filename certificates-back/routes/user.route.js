const express = require('express');
const router = express.Router();
const User = require('../models/user').user;
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle.server.error');
const checkAuthenticated = require('../util/check.athenticated');

router.use(checkAuthenticated);

router.post('/getcurrent', async (request, response) => {
    User.findOne({_id: request.userId}, (error, existingUser) => {
        if(error) {
            return response.status(HttpStatus.NOT_FOUND).send({
                message: 'User was not found'
            });
        }
        existingUser.password = undefined;
        response.send(existingUser);
    });
});

module.exports = router;

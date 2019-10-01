const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Certificate = require('../models/certificates');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');

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

router.post('/buyCertificate/:certificateId', async (request, response) => {
    const certificate = await Certificate.findById(request.params.certificateId);
    const user = await User.findById(request.userId);

    certificate.owners.push(user);

    certificate.save()
        .then(response.status(HttpStatus.OK).send())
        .catch(error => handleError(error, response));
});

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserCertificates = require('../models/user-certificates').userCertificate;
const User = require('../models/user');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');
const buildFilter = require('../util/filter-builder');

router.use(checkAuthenticated);

router.post('/', (request, response) => {
    User.findById(request.userId)
        .then((user) => {
            const userCertificate = new UserCertificates({
                _id: new mongoose.Types.ObjectId(),
                user: user,
                certificate: request.body
            });
            userCertificate.save()
                .then(result => {
                    response.status(HttpStatus.OK).json({
                        message: 'User certificate created',
                    });
                })
                .catch(error => handleError(error, response));
        })
        .catch(error => handleError(error, response));
});

router.delete('/:id', (request, response) => {
    UserCertificates.remove({user: request.userId, certificate: request.params.id})
        .then(result => {
            response.status(HttpStatus.OK).json({
                message: 'User certificate was deleted'
            });
        })
        .catch(error => handleError(error, response));
});

router.post('/filter/:limit', async (request, response) => {
    const filter = buildFilter(request.body.filter);

    const result = {};
    UserCertificates.countDocuments({user: request.userId}).exec((error, number) => {
        result.number = number;
        UserCertificates.find({user: request.userId})
            .select('certificate')
            .populate({path: 'certificate', match: {...filter}, options: {sort: {date: -1}}})
            .limit(parseInt(request.params.limit))
            .exec()
            .then(userCertificates => {
                if (!userCertificates) {
                    return response.status(HttpStatus.NOT_FOUND).send({
                        message: 'None certificates was found'
                    });
                }
                result.certificates = userCertificates.reduce((accumulator, currentValue) => {
                    currentValue.certificate && accumulator.push(currentValue.certificate);
                    return accumulator;
                }, []);
                response.send(result);
            })
            .catch(error => handleError(error, response));
    });
});

module.exports = router;

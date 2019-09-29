const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserCertificate = require('../models/user.certificate').userCertificate;
const User = require('../models/user').user;
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle.server.error');
const checkAuthenticated = require('../util/check.athenticated');
const buildFilter = require('../util/mongo.filter.builder');

router.use(checkAuthenticated);

router.put('/add', (request, response) => {
    User.findOne({_id: request.userId}, (error, user) => {
        if (error) {
            return response.status(401).send({
                message: 'User does not exists!'
            });
        }

        const userCertificate = new UserCertificate({
            _id: new mongoose.Types.ObjectId(),
            user: user,
            certificate: request.body
        });
        console.log(userCertificate);
        userCertificate.save();

        response.send();
    });
});

router.delete('/delete', (request, response) => {
    const certificate = request.body;

    UserCertificate.remove({
        user: request.userId,
        certificate: certificate._id
    }, (error) => {
        if(error) {
            return response.status(401).send({
                message: 'User certificate does not exists!'
            });
        }
    });
});

router.post('/filter/:limit', async (request, response) => {
    const filter = buildFilter(request.body.filter);

    const result = {};
    UserCertificate.countDocuments({user: request.userId}).exec((error, number) => {
        result.number = number;
        UserCertificate.find({user: request.userId})
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
                console.log(userCertificates);
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

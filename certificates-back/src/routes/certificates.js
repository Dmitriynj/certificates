const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Certificate = require('../models/certificates');
const User = require('../models/user');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');
const buildFilter = require('../util/filter-builder');

router.use(checkAuthenticated);

router.post('/', (request, response) => {
    const certificate = new Certificate({
        _id: new mongoose.Types.ObjectId(),
        title: request.body.title,
        description: request.body.description,
        date: request.body.date,
        cost: request.body.cost,
        tags: request.body.tags,
        owners: []
    });
    certificate.save()
        .then(result => {
            response.status(HttpStatus.CREATED)
                .json({
                    message: 'Certificate created',
                    createdCertificate: result
                });
        })
        .catch(error => response.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({error: error}));
});

router.get('/:id', (request, response) => {
    Certificate.findById(request.params.id)
        .exec()
        .then(doc => response.status(HttpStatus.OK).json(doc))
        .catch(error => response.status(HttpStatus.NOT_FOUND).json(error));
});

router.delete('/:id', (request, response) => {
    Certificate.remove({_id: request.params.id})
        .then(result => response.status(HttpStatus.OK).json(result))
        .catch(error => handleError(error, response))
});

router.patch('/:id', (request, response) => {
    Certificate.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (result) => {
        response.status(HttpStatus.OK).json(result);
    }).catch(error => handleError(error, response));
});

router.patch('/buy/:id', async (request, response) => {
    const certificate = await Certificate.findById(request.params.id);
    const user = await User.findById(request.userId);

    certificate.owners.push(user);

    Certificate.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (result) => {
        response.status(HttpStatus.OK).json(result);
    }).catch(error => handleError(error, response));
});

router.post('/filter/:limit/:page', async (request, response) => {
    const filter = buildFilter(request.body.filter, request.userId);
    const limit = parseInt(request.params.limit);
    const page = parseInt(request.params.page);

    const number = await Certificate.countDocuments(filter)
        .exec()
        .catch(error => handleError(error, response));

    const offset = (page - 1) * limit;
    const certificates = await Certificate.find(filter)
        .select('-owners')
        .skip(offset)
        .limit(limit)
        .sort({ date: -1 })
        .exec()
        .catch(error => handleError(error, response));

    console.log(certificates);
    response.status(HttpStatus.OK).send({
        number,
        certificates
    });
});

module.exports = router;

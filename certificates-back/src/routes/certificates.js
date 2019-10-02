const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Certificate = require('../models/certificates');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');
const buildFilter = require('../util/filter-builder');
const permit = require('../middleware/permission');

router.use(checkAuthenticated);

router.post('/', (request, response) => {
    const certificate = new Certificate({
        _id: new mongoose.Types.ObjectId(),
        ...request.body,
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

router.post('/buy/:id', async (request, response) => {
    const certificate = await Certificate.findById(request.params.id);

    if (certificate.owners.includes(request.userId)) {
        handleError('You already have this certificate!', response);
    } else {

        certificate.owners.push(request.userId);
        await certificate.save()
            .catch(error => handleError(error, response));

        Certificate
            .findOne({owners: {$in: request.userId}})
            .select('-title -description -date -cost -tags -owners')
            .exec()
            .then(result => response.status(HttpStatus.OK).json({
                haveCertificates: !!result
            }))
            .catch(error => handleError(error, response));
    }
});

router.delete('/cell/:id', permit("ADMIN"), async (request, response) => {
    const certificate = await Certificate.findById(request.params.id);

    if (!certificate.owners.includes(request.userId)) {
        handleError('Nothing to cell!', response);
    } else {

        const index = certificate.owners.indexOf(request.userId);
        certificate.owners.splice(index, 1);
        await certificate.save()
            .catch(error => handleError(error, response));

        Certificate
            .findOne({owners: {$in: request.userId}})
            .select('-title -description -date -cost -tags -owners')
            .exec()
            .then(result => response.status(HttpStatus.OK).json({
                haveCertificates: !!result
            }))
            .catch(error => handleError(error, response));
    }
});

router.post('/filter/:limit/:page', async (request, response) => {
    const filter = buildFilter(request.body.filter, request.userId);
    const limit = parseInt(request.params.limit);
    const page = parseInt(request.params.page);

    const number = await Certificate.countDocuments(filter)
        .exec()
        .catch(error => handleError(error, response));

    const anyUserCertificate = await Certificate
        .findOne({owners: {$in: request.userId}})
        .select('-title -description -date -cost -tags -owners')
        .exec()
        .catch(error => handleError(error, response));

    const offset = (page - 1) * limit;
    const aggregateQuery = [
        {$match: filter},
        {$sort: {date: -1}},
        {$skip: offset},
        {$limit: limit},
        {
            $addFields: {
                isOwned: {
                    $in: [
                        mongoose.Types.ObjectId(request.userId),
                        {$ifNull: ['$owners', []]}
                    ]
                }
            }
        },
        {
            $project: {
                owners: '$$REMOVE',
                title: true,
                description: true,
                date: true,
                cost: true,
                tags: true,
                isOwned: true,
            }
        }
    ];
    Certificate
        .aggregate(aggregateQuery)
        .exec()
        .then(certificates => response.status(HttpStatus.OK).send({
            haveCertificates: !!anyUserCertificate,
            number,
            certificates
        }))
        .catch(error => handleError(error, response));
});

module.exports = router;

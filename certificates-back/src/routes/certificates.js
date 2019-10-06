const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Certificate = require('../models/certificates');
const User = require('../models/user');
const OrderIndex = require('../models/order-index');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');
const buildFilterWithCertPrefix = require('../util/filter-builder').filterWithCertificate;
const buildFilter = require('../util/filter-builder').filter1;
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
    const certificate = await Certificate.findById(mongoose.Types.ObjectId(request.params.id));

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

/**
 * Initial fun to init values
 */
router.post('/order', async (request, response) => {
    const user = await User.findById(request.userId)
        .catch(error => handleError(error, response));

    const certificates = await Certificate.find({})
        .exec()
        .catch(error => handleError(error, response));

    console.log(user);
    console.log(certificates.length);

    certificates.forEach((certificate, index) => {
        const orderIndex = new OrderIndex({
            _id: mongoose.Types.ObjectId(),
            index: index,
            certificate: certificate,
            user: user,
        });
        orderIndex.save();
    });

    response.status(HttpStatus.OK).send();
});

router.post('/updateOrder/:limit/:page', async (request, response) => {
    const orderIndexes = request.body.orderIndexes;

    console.log(orderIndexes);

    orderIndexes.forEach(async orderIndex => {
        await OrderIndex.update(
            {_id: mongoose.Types.ObjectId(orderIndex._id)},
            {$set: {certificate: mongoose.Types.ObjectId(orderIndex.certificateId)}})
            .catch(error => handleError(error, response));
    });

    response.status(HttpStatus.OK).send();
});

router.post('/ordered/:limit/:page', async (request, response) => {
    const filter = buildFilterWithCertPrefix(request.body.filter, request.userId);
    const filter1 = buildFilter(request.body.filter, request.userId);

    const number = await Certificate.countDocuments(filter1)
        .exec()
        .catch(error => handleError(error, response));

    const anyUserCertificate = await Certificate
        .findOne({owners: {$in: request.userId}})
        .select('-title -description -date -cost -tags -owners')
        .exec()
        .catch(error => handleError(error, response));

    const limit = parseInt(request.params.limit);
    const page = parseInt(request.params.page);
    const offset = (page - 1) * limit;

    const query = [
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $lookup: {
                from: 'certificates',
                localField: 'certificate',
                foreignField: '_id',
                as: 'certificate'
            }
        },
        {$unwind: "$certificate"},
        {$unwind: "$user"},
        {
            $match: filter
        },
        {
            $sort: {
                index: 1
            }
        },
        {$skip: offset},
        {$limit: limit},
        {
            $addFields: {
                isOwned: {
                    $in: [
                        mongoose.Types.ObjectId(request.userId),
                        {$ifNull: ['$certificate.owners', []]}
                    ]
                }
            }
        },
        {
            $project: {
                certificate: true,
                isOwned: true,
                index: true,
            }
        }
    ];
    OrderIndex.aggregate(query)
        .then((orderIndexes) => response.status(HttpStatus.OK).send({
            haveCertificates: !!anyUserCertificate,
            number,
            orderIndexes
        }))
        .catch(error => handleError(error, response));
});

router.post('/filter/:limit/:page', async (request, response) => {
    const filter = buildFilter.filter1(request.body.filter, request.userId);
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

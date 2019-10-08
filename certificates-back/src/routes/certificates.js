const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Certificate = require('../models/certificates');
const OrderedItem = require('../models/ordered-item');
const Order = require('../models/order');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');
const buildFilter = require('../util/filter-builder').buildFilter;

router.use(checkAuthenticated);

router.post('/', (request, response) => {
    const certificate = new Certificate({
        _id: new mongoose.Types.ObjectId(),
        ...request.body,
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

router.get('/:id', async (request, response) => {
    try {
        const certificate = await Certificate.findById(mongoose.Types.ObjectId(request.params.id))
            .exec();
        response.status(HttpStatus.OK).send(certificate);
    } catch (error) {
        handleError(error, response);
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const certificateId = mongoose.Types.ObjectId(request.params.id);
        await Order.deleteMany({certificate: certificateId});
        await OrderedItem.deleteMany({certificate: certificateId});
        await Certificate.deleteOne({_id: certificateId});
        response.status(HttpStatus.OK).send();
    } catch (error) {
        handleError(error, response);
    }
});

router.patch('/:id', async (request, response) => {
    try {
        console.log(request.params.id);
        console.log(request.body);
        await Certificate.findOneAndUpdate({_id: mongoose.Types.ObjectId(request.params.id)}, request.body, {new: true});
        response.status(HttpStatus.OK).send();
    } catch (error) {
        handleError(error, response);
    }
});

router.post('/filter/:limit/:page', async (request, response) => {
    const filter = buildFilter(request.body.filter, request.userId);

    try {
        const number = await Certificate.countDocuments(filter)
            .exec();

        const anyUserCertificate = await Order
            .findOne({user: request.userId})
            .exec();

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
            {
                $lookup: {
                    from: 'orders',
                    localField: 'certificate._id',
                    foreignField: 'certificate',
                    as: 'orders'
                }
            },
            {$unwind: "$certificate"},
            {$unwind: "$user"},
            {
                $match: filter,
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
                    certificate: {
                        isOwned: {

                            $in: [
                                mongoose.Types.ObjectId(request.userId),
                                {$ifNull: ['$orders.user', []]}
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    certificate: true,
                    isOwned: true
                }
            }
        ];

        const orderedItems = await OrderedItem.aggregate(query);
        response.status(HttpStatus.OK).send({
            haveCertificates: !!anyUserCertificate,
            number,
            orderedItems
        });
    } catch(e) {
        handleError(e, response);
    }
});

module.exports = router;

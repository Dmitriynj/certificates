const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Certificate = require('../models/certificates');
const User = require('../models/user');
const OrderedItem = require('../models/ordered-item');
const Order = require('../models/order');
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');
const buildFilter = require('../util/filter-builder').buildFilter;
const permit = require('../middleware/permission');

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

router.get('/:id', (request, response) => {
    Certificate.findById(request.params.id)
        .exec()
        .then(doc => response.status(HttpStatus.OK).json(doc))
        .catch(error => response.status(HttpStatus.NOT_FOUND).json(error));
});

router.delete('/:id', async (request, response) => {
    try {
        const certificateId = mongoose.Types.ObjectId(request.params.id);
        await Order.remove({certificate: certificateId});
        await OrderedItem.remove({certificate: certificateId});
        await Certificate.remove({_id: certificateId});
        response.status(HttpStatus.OK).send();
    } catch (error) {
        handleError(error, response);
    }
});

router.patch('/:id', (request, response) => {
    Certificate.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (result) => {
        response.status(HttpStatus.OK).json(result);
    }).catch(error => handleError(error, response));
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
        const orderedItem = new OrderedItem({
            _id: mongoose.Types.ObjectId(),
            index: index,
            certificate: certificate,
            user: user,
        });
        orderedItem.save();
    });

    response.status(HttpStatus.OK).send();
});

router.post('/updateOrder/:limit/:page', async (request, response) => {
    const orderedItems = request.body.orderedItems;

    console.log(orderedItems);

    orderedItems.forEach(async orderedItem => {
        await OrderedItem.update(
            {
                _id: mongoose.Types.ObjectId(orderedItem._id)
            },
            {
                $set: {
                    certificate: mongoose.Types.ObjectId(orderedItem.certificateId)
                }
            })
            .catch(error => handleError(error, response));
    });

    response.status(HttpStatus.OK).send();
});

router.post('/ordered/:limit/:page', async (request, response) => {
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

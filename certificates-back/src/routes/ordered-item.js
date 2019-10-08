const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const HttpStatus = require('http-status-codes');
const OrderedItem = require('../models/ordered-item');
const Certificate = require('../models/certificates');
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');

router.use(checkAuthenticated);

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

module.exports = router;

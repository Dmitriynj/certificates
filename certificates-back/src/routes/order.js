const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');
const Certificate = require('../models/certificates');
const HttpStatus = require('http-status-codes');
const router = express.Router();
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');

router.use(checkAuthenticated);

router.post('/:certificateId', async (request, response) => {
    try {
        const existingOrder = await Order.findOne({
            user: request.userId,
            certificate: mongoose.Types.ObjectId(request.params.certificateId)
        });

        if(!existingOrder) {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                user: mongoose.Types.ObjectId(request.userId),
                certificate: mongoose.Types.ObjectId(request.params.certificateId)
            });

            await order.save();
            response.status(HttpStatus.OK).send();
        } else {
            handleError('Something went wrong! Maybe, You already have this certificate!', response);
        }
    } catch (e) {
        handleError(e, response);
    }
});

router.delete('/:certificateId', async (request, response) => {
    try {

        const existingOrder = await Order.findOne({
            user: request.userId,
            certificate: mongoose.Types.ObjectId(request.params.certificateId)
        });

        console.log(existingOrder);

        await Order.findOneAndRemove({_id: existingOrder._id});
        response.status(HttpStatus.OK).send();
    } catch (e) {
        handleError('Something went wrong! Nothing to cell!', response);
    }
});

module.exports = router;

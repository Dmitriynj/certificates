const express = require('express');
const router = express.Router();
const Certificate = require('../models/certificate').certificate;
const HttpStatus = require('http-status-codes');
const handleError = require('../util/handle.server.error');
const checkAuthenticated = require('../util/check.athenticated');
const buildFilter = require('../util/mongo.filter.builder');

router.use(checkAuthenticated);

router.post('/filter/:limit', async (request, response) => {
    const filter = buildFilter(request.body.filter);
    console.log(filter);
    const result = {};
    Certificate.countDocuments(filter).exec((error, number) => {
        result.number = number;
        console.log(number);
        Certificate.find(filter)
            .limit(parseInt(request.params.limit))
            .sort({date: -1})
            .exec()
            .then(certificates => {
                console.log(certificates.length);
                if (!certificates) {
                    return response.status(HttpStatus.NOT_FOUND).send({
                        message: 'None certificates was found'
                    });
                }
                result.certificates = certificates;
                response.send(result);
            })
            .catch(error => handleError(error, response));
    });
});

router.post('/paginate/:limit/:offset', (request, response) => {
    const filter = buildFilter(request.body.filter);

    Certificate.find(filter)
        .skip(parseInt(request.params.offset))
        .limit(parseInt(request.params.limit))
        .sort({date: -1})
        .exec()
        .then(certificates => {
            if (!certificates) {
                return response.status(HttpStatus.NOT_FOUND).send({
                    message: 'None certificates was found'
                });
            }
            response.send(certificates);
        })
        .catch(error => handleError(error, response));
});

router.put('/update/:id', (request, response) => {
    Certificate.findOneAndUpdate({_id: request.params.id}, request.body, {new: true}, (error, certificate) => {
        if(error) {
            return response.status(HttpStatus.NOT_FOUND).send({
                message: 'Certificate was not found'
            });
        }
        response.send(certificate);
    }).catch(error => handleError(error));
});


module.exports = router;

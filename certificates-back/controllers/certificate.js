const Certificate = require('../models/Certificate');

module.exports = {
    get: (request, response) => {
        Certificate.find({}).populate('user', '-password').exec((error, result) => {
            response.send(result);
        });
    },
    post: (request, response) => {
        console.log(request.body, request.user);

        request.body.author = request.user;
        let certificate = new Certificate(request.body);
        certificate.save();
        request.status(200);
    }
};

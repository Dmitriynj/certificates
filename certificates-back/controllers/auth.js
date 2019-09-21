const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jwt-simple');
const moment = require('moment');
const saltRounds = 10;
const secret = 'mySecretString';

module.exports = {
    register: (request, response) => {
        console.log(request.body);

        User.findOne({email: request.body.email}, (error, existingUser) => {
            if (existingUser) {
                return response.status(409).send({
                    message: 'Email is already registered!'
                });
            }

            let user = new User(request.body);

            bcrypt.hash(user.password, saltRounds, function (error, hash) {
                user.password = hash;
                user.save((error, result) => {
                    if (error) {
                        response.status(500).send().message({
                            message: error.message
                        });
                    }
                    response.status(200).send({
                        token: createToken(result)
                    });
                });
            });
        });
    },
    login: (request, response) => {
        User.findOne({
            email: request.body.email
        }, async (error, user) => {
            if (!user) {
                return response.status(401).send({
                    message: 'User does not exists!'
                });
            }
            let match = await bcrypt.compare(request.body.password, user.password);
            if(match) {
                console.log(request.body, user.password);
                return response.send({
                    token: createToken(user)
                })
            } else {
                return response.status(401).send({
                   message: 'Invalid password'
                });
            }
        });
    }
};

function createToken(user) {
    let payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, secret);
}

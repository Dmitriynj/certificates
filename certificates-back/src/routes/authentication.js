const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bCrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jwt-simple');
const moment = require('moment');
const secret = require('../config/token').secret;
const HttpStatus = require('http-status-codes');
const saltRounds = 12;

function createToken(user) {
    let payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };

    return jwt.encode(payload, secret);
}

router.post('/register', (request, response) => {
   User.findOne({email: request.body.email}, (error, existingUser) => {
        if (existingUser) {
            return response.status(HttpStatus.CONFLICT).send({
                message: 'Email is already registered!'
            });
        }

        let user = new User(request.body);
        user._id = new mongoose.Types.ObjectId();
        user.role = 'USER';
        bCrypt.hash(user.password, saltRounds, function (error, hash) {
            user.password = hash;
            user.save((error, result) => {
                if (error) {
                    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                        message: error.message
                    });
                }
                response.status(HttpStatus.OK).send();
            });
        });
    });
});

router.post('/login', (request, response) => {
    User.findOne({
        email: request.body.email
    }, async (error, user) => {
        if (!user) {
            return response.status(HttpStatus.UNAUTHORIZED).send({
                message: 'User does not exists!'
            });
        }
        let match = await bCrypt.compare(request.body.password, user.password);
        if(match) {
            let {password, ...userWithoutPass} = user._doc;
            return response.send({
                user: userWithoutPass,
                token: createToken(user._doc)
            });
        } else {
            return response.status(HttpStatus.UNAUTHORIZED).send({
                message: 'Invalid password'
            });
        }
    });
});

module.exports = router;

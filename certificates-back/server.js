'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const auth = require('./controllers/auth');
const certificate = require('./controllers/certificate');
const checkAuthenticated = require('./services/checkAthenticated');
const cors = require('./services/cors');

//Middleware
app.use(bodyParser.json());
app.use(cors);

//Requests
app.post('/api/certificate', checkAuthenticated, certificate.post);
app.get('/api/certificate', certificate.get);

app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

//Connection
mongoose.connect('mongodb://localhost:27017/test',  { useNewUrlParser: true }, (error, client) => {
    if (!error) {
        console.log('we are connected to mango');
    }
});

var server = app.listen(5000, () => {
    console.log('listening on port ' + server.address().port);
});



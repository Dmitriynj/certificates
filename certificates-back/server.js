const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const certificateRoute = require('./src/routes/certificates');
const authRoute = require('./src/routes/authentication');
const orderRoute = require('./src/routes/order');
const orderItemRoute = require('./src/routes/ordered-item');
const db = require('./src/config/db');
const morgan = require('morgan');
const HttpStatus = require('http-status-codes');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/certificate', certificateRoute);
app.use('/order', orderRoute);
app.use('/orderitem', orderItemRoute);

app.use((request, response, next) => {
    const error = new Error('Not found');
    error.status = HttpStatus.NOT_FOUND;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    response.json({
        message: error.message
    })
});

mongoose.set('useFindAndModify', false);
mongoose.connect(db.url, {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true}, (error, client) => {
    if (!error) {
        console.log('we are connected to mango');
    }
});

const server = app.listen(5000, () => {
    console.log('listening on port ' + server.address().port);
});



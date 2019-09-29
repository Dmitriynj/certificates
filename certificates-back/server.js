const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const certificateRoute = require('./routes/certificate.route');
const authRoute = require('./routes/auth.route');
const userCertificateRoute = require('./routes/user.certificate.route');
const userRoute = require('./routes/user.route');
const db = require('./config/db');

const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoute);
app.use('/certificate', certificateRoute);
app.use('/usercertificate', userCertificateRoute);
app.use('/user', userRoute);

//Connection
mongoose.set('useFindAndModify', false);
mongoose.connect(
    db.url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (error, client) => {
        if (!error) {
            console.log('we are connected to mango');
        }
    });

const server = app.listen(5000, () => {
    console.log('listening on port ' + server.address().port);
});



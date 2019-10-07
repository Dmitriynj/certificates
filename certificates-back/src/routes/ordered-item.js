const express = require('express');
const mongoose = require('mongoose');
const OrderItem = require('../models/ordered-item');
const Certificate = require('../models/certificates');
const router = express.Router();
const handleError = require('../util/handle-error');
const checkAuthenticated = require('../middleware/check-athenticated');

router.use(checkAuthenticated);



module.exports = router;

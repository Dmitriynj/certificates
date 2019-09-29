const authRoutes = require('./auth.route');
const certificateRoutes = require('./certificate.route');
const userCertificateRoute = require('./user.certificate.route');

module.exports = function(app, db) {
    authRoutes(app,db);
    certificateRoutes(app, db);
    userCertificateRoute(app, db)
};

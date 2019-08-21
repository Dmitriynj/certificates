"use strict";

angular.
    module('certificates').
    config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.
        when('/login', {
            template: '<login-form></login-form>'
        }).
        when('/certificates', {
            template: '<certificates></certificates>'
        }).
        otherwise('/login');
    }
]);
(function () {
    "use strict";

    angular
        .module('certificatesApp', ['ngRoute', 'ngCookies'])
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })

            .otherwise( {redirectTo: '/login' } );
    }
})();
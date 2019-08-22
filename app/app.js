(function () {
    "use strict";

    angular
        .module('certificatesApp', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .when('/home', {
                templateUrl: 'home/home.template.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        AuthenticationService.RequireAuth();
                    }
                }
            })

            .otherwise( {redirectTo: '/login' } );
    }

    run.$inject = ['$rootScope', '$location'];
    function run($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser || false;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }
})();
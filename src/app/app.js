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
                templateUrl: 'app/login/login.template.html',
                controller: 'LoginController',
                controllerAs: 'vm',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        if(AuthenticationService.IsAuthenticated()){
                            AuthenticationService.ClearCredentials();
                        }
                    }
                }
            })
            .when('/home', {
                templateUrl: 'app/home/home.template.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        AuthenticationService.RequireAuth();
                    }
                }
            })
            .when('/register', {
                templateUrl: 'app/register/register.template.html',
                controller: 'RegistrationController',
                controllerAs: 'vm',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        if(AuthenticationService.IsAuthenticated()){
                            AuthenticationService.ClearCredentials();
                        }
                    }
                }
            })

            .otherwise( {redirectTo: '/login'} );
    }

    run.$inject = ['$rootScope', '$location', 'AuthenticationService', 'MessageService'];
    function run($rootScope, $location, AuthenticationService, MessageService) {
        $rootScope.logout = logout;
        $rootScope.clearMessage = clearMessage;

        function logout(){
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        }

        function clearMessage(){
            MessageService.ClearFlashMessage();
        }

        $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            // var loggedIn = $rootScope.globals.currentUser || false;
            if (restrictedPage && !AuthenticationService.IsAuthenticated()) {
                $location.path('/login');
            }
        });
    }
})();
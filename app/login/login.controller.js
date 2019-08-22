(function () {
    "use strict";

    angular
        .module('certificatesApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'MessageService'];
    function LoginController($location, AuthenticationService, MessageService) {
        var vm = this;
        vm.login = login;

        vm.maxlength = 30;
        vm.minlength = 4;

        vm.credentials = {
            email: '',
            password: ''
        };

        function login(isValid) {
            if(isValid){
                AuthenticationService.Login(vm.credentials, function (response) {
                    if(response.success){
                        AuthenticationService.SetCredentials(vm.credentials);
                        $location.path('/');
                    }else {
                        MessageService.Error(response.message);
                    }
                });
            }

        }
    }
})();
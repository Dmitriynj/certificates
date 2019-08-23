(function() {
    "use strict";

    angular.module('certificatesApp')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$location', 'AuthenticationService', 'MessageService'];
    function RegistrationController($location, AuthenticationService, MessageService) {
        var vm = this;
        vm.register = register;
        vm.maxlength = 30;
        vm.minlength = 4;
        vm.credentials = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        };

        function register(isValid) {
            if(isValid) {
                // AuthenticationService.
            }
        }

    }
})();
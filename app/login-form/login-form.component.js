"use strict";

angular
    .module('loginForm')
    .controller('LoginFormController', LoginFormController);

LoginFormController.$inject = ['$routeParams', '$location', 'AuthenticationService', 'FlashService'];
function LoginFormController($routeParams, $location, AuthenticationService, FlashService) {
    this.maxlength = 30;
    this.minlength = 4;

    this.credentials = {
        login: '',
        password: ''
    };

    // var vm = this;
    //
    // vm.submitForm = submitForm;

    (function initController() {
        // reset login status
        AuthenticationService.ClearCredentials();
    })();

    this.submitForm = function (isValid) {
        if (isValid) {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    };

    // this.submitForm = function (isValid) {
    //     if (isValid) {
    //         this.currentUser = {
    //             name: this.credentials.login
    //         };
    //     }
    // };
}

//
//     .component('loginForm', {
//     templateUrl: 'login-form/login-form.template.html',
//     controller: ['$routeParams',
//         function LoginFormController($routeParams, $location, AuthenticationService, FlashService) {
//
//
//         }]
// });
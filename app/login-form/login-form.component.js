"use strict";

angular
    .module('loginForm').
    component('loginForm', {
        templateUrl: 'login-form/login-form.template.html',
        controller: ['$routeParams',
            function LoginFormController($routeParams) {
                this.maxlength = 30;
                this.minlength = 4;

                this.credentials = {
                    login:'',
                    password:''
                };

                this.submitForm = function (isValid) {
                    if(isValid){
                        this.currentUser = {
                            name: this.credentials.login
                        };
                    }
                };

            }]
    });
(function () {
    "use strict";

    angular
        .module('certificatesApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['MessageService'];
    function HomeController(MessageService) {
        var vm = this;

        MessageService.Success('Hello!');
    }
})();
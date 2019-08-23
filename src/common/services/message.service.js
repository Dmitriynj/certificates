(function () {
    "use strict";

    angular.module('certificatesApp')
        .factory('MessageService', MessageService);

    MessageService.$inject = ['$rootScope'];
    function MessageService($rootScope) {
        var service = {};

        service.Success = Success;
        service.Error = Error;
        service.ClearFlashMessage = ClearFlashMessage;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                ClearFlashMessage();
            });
        }

        function ClearFlashMessage() {
            var message = $rootScope.message;
            if (message) {
                if (!message.keepAfterLocationChange) {
                    delete $rootScope.message;
                } else {
                    // only keep for a single location change
                    message.keepAfterLocationChange = false;
                }
            }
        }

        function Success(message, keepAfterLocationChange) {
            $rootScope.message = {
                message: message,
                type: 'success',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }

        function Error(message, keepAfterLocationChange) {
            $rootScope.message = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
    }

})();
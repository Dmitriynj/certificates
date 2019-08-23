(function() {
   "use strict";

   angular.module('certificatesApp')
       .factory('UserService', UserService);

   function UserService() {
       var defaultUser = {
           email: 'admin@epam.com',
           password: 'admin',
           firstName: 'admin',
           lastName: 'adminovich'
       };

       var service = {};

       service.GetByEmail = GetByEmail;

       return service;

       /**
        * @return {null}
        */
       function GetByEmail(email) {
          if(defaultUser.email === email){
              return defaultUser;
          }else {
              return null;
          }
       }


   }

})();
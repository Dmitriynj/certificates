import uiRouter from '@uirouter/angularjs';
import { certificatesComponent } from './certificates.component';
import { certificateTagsFilter } from './certificates.tag.filter';
import { UserService } from "../../../common/services/user.service";
import 'ngstorage/ngStorage.min';

export const certificates = angular
  .module('components.home.certificates', [
    uiRouter,
    'ngStorage'
  ])
  .component('certificates', certificatesComponent)
  .filter('certificateTagsFilter', certificateTagsFilter)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('certificates', {
        parent: 'app',
        url: '/certificates',
        component: 'certificates',
        data: {
          requiredAuth: true,
        },
        resolve: {
          certificates: async CertificateService => {
            'ngInject';
            let response = await CertificateService.getAllCertificates();
            return response.data;
          },
        }
      });

  })
  .run(($rootScope, $localStorage, $http) => {
    'ngInject';

    // $http.get('/data/certificates.json').then((response) => {
    //   $localStorage.globals = {
    //     certificates: response.data,
    //   };
    // }, (error) => {});

      // $localStorage.globals.users = [
      //
      //     {
      //       id: 1,
      //       email: 'admin@epam.com',
      //       password: 'admin',
      //       isAdmin: true
      //     },
      //     {
      //       id: 2,
      //       email: 'user@epam.com',
      //       password: 'user',
      //       isAdmin: false
      //     }
      //   ];
  })
  .service('UserService', UserService)
  .name;

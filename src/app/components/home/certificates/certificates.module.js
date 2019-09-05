import uiRouter from '@uirouter/angularjs';
import {certificatesComponent} from './certificates.component';
import {certificateTagsFilter} from './certificates.tags.filter';
import {certificateInputFilter} from "./certificates.input.filter";
import {UserService} from "../../../common/services/user.service";
import {pagination} from "../../../common/pagination/pagination.module";
import 'ngstorage/ngStorage.min';

export const certificates = angular
  .module('components.home.certificates', [
    uiRouter,
    pagination,
    'ngStorage'
  ])
  .component('certificates', certificatesComponent)
  .filter('certificateTagsFilter', certificateTagsFilter)
  .filter('certificateInputFilter', certificateInputFilter)
  .config(config)
  .run(run)
  .service('UserService', UserService)
  .name;

config.$inject = ['$stateProvider'];
function config($stateProvider) {

  $stateProvider
    .state('certificates', {
      parent: 'app',
      url: '/certificates',
      component: 'certificates',
      data: {
        requiredAuth: true,
      },
      resolve: {
        certificates
      }
    });

  certificates.$inject = ['CertificateService'];
  async function certificates(CertificateService) {

    let response = await CertificateService.getAllCertificates();
    return response.data;
  }
}

run.$inject = ['$rootScope', '$localStorage', '$http'];
function run($rootScope, $localStorage, $http) {

  // $http.get('/data/certificates.json').then((response) => {
  //   $localStorage.globals = {
  //     certificates: response.data,
  //     users: [
  //       {
  //         id: 1,
  //         email: 'admin@epam.com',
  //         password: 'admin',
  //         isAdmin: true
  //       },
  //       {
  //         id: 2,
  //         email: 'user@epam.com',
  //         password: 'user',
  //         isAdmin: false
  //       }
  //     ]
  //   };
  // }, (error) => {});
}

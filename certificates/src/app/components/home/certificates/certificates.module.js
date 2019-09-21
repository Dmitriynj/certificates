import uiRouter from '@uirouter/angularjs';
import {certificatesComponent} from './certificates.component';
import {certificateTagsFilter} from './certificates.filter';
import {certificateInputFilter} from "./certificates.filter";
import {myCertificatesFilter} from "./certificates.filter";
import {UserService} from "../../../common/services/user.service";
import {pagination} from "../../../common/components/pagination/pagination.module";
import 'ngstorage/ngStorage.min';
import 'angular-ui-sortable/dist/sortable.min';
import 'angular-ui-sortable-loader';

export const certificates = angular
  .module('components.home.certificates', [
    uiRouter,
    pagination,
    'ngStorage',
    'ui.sortable'
  ])
  .component('certificates', certificatesComponent)
  .filter('certificateTagsFilter', certificateTagsFilter)
  .filter('certificateInputFilter', certificateInputFilter)
  .filter('myCertificatesFilter', myCertificatesFilter)
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

run.$inject = ['uiSortableConfig', '$localStorage', '$http'];
function run(uiSortableConfig, $localStorage, $http) {
  /**
   * for angular-ui-sortable module only
   * @type {string}
   */
  uiSortableConfig.jQueryPath = 'https://code.jquery.com/jquery-3.4.1.min.js';
  uiSortableConfig.jQueryUiPath = 'https://code.jquery.com/ui/1.11.4/jquery-ui.js';

  $http.get('/data/certificates.json').then((response) => {
    $localStorage.globals = {
      certificates: response.data,
      users: [
        {
          id: 1,
          email: 'admin@epam.com',
          password: 'YWRtaW4=',
          isAdmin: true
        },
        {
          id: 2,
          email: 'user@epam.com',
          password: 'dXNlcg==',
          isAdmin: false
        }
      ],
      lang: 'ru'
    };
  }, (error) => {});

}

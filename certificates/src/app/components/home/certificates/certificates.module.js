import uiRouter from '@uirouter/angularjs';
import {certificatesComponent} from './certificates.component';
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
  .config(config)
  .run(run)
  .name;

config.$inject = ['$stateProvider', 'stateConst', 'componentConst', 'appConst'];

function config($stateProvider, stateConst, componentConst, appConst) {

  $stateProvider
    .state(stateConst.CERTIFICATES.name, {
      parent: stateConst.APP.name,
      url: stateConst.CERTIFICATES.url,
      component: componentConst.CERTIFICATES,
      data: {
        requiredAuth: true,
      },
      resolve: {
        // certificatesData: certificatesData,
        // userCertificatesData: userCertificatesData
      }
    });

  certificatesData.$inject = ['CertificateService'];
  async function certificatesData(CertificateService) {
    return await CertificateService.filterCertificates(appConst.CERTIFICATES_PAGE_SIZE, appConst.START_PAGE, {});
  }

  // userCertificatesData.$inject = ['CertificateService'];
  // async function userCertificatesData(CertificateService) {
  //   return await CertificateService.filterUserCertificates(appConst.CERTIFICATES_PAGE_SIZE, appConst.START_PAGE, {});
  // }
}

run.$inject = ['uiSortableConfig'];
function run(uiSortableConfig) {
  /**
   * for angular-ui-sortable module only
   * @type {string}
   */
  uiSortableConfig.jQueryPath = 'https://code.jquery.com/jquery-3.4.1.min.js';
  uiSortableConfig.jQueryUiPath = 'https://code.jquery.com/ui/1.11.4/jquery-ui.js';
}

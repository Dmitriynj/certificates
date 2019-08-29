import uiRouter from '@uirouter/angularjs';
import { certificatesComponent } from './certificates.component';
import { certificateTagsFilter } from './certificates.tag.filter';

export const certificates = angular
  .module('components.home.certificates', [
    uiRouter,
  ])
  .component('certificates', certificatesComponent)
  .filter('certificateTagsFilter', certificateTagsFilter)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('certificates', {
        url: '/certificates',
        component: 'certificates',
        data: {
          requiredAuth: true,
        },
        resolve: {
          certificates: CertificateService => CertificateService.getCertificatesList(),
          // filter: certificateTagsFilter
        }
      });
  })
  .name;

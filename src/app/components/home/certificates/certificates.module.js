import uiRouter from '@uirouter/angularjs';
import { certificatesComponent } from './certificates.component';
import { certificateTagsFilter } from './certificates.tag.filter';
import { PagerService } from './certificates.pager.service';

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
        parent: 'app',
        url: '/certificates',
        component: 'certificates',
        data: {
          requiredAuth: true,
        },
        resolve: {
          getAllCertificates: CertificateService => {
            'ngInject';

            return CertificateService.getAllCertificates;
          },
        }
      });
  })
  .service('PagerService', PagerService)
  .name;

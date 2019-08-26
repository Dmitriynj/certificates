import uiRouter from '@uirouter/angularjs';
import { certificatesComponent } from './certificates.component';

export const certificates = angular
  .module('components.home.certificates', [
    uiRouter,
  ])
  .component('certificates', certificateComponent)
  .config(($stateProfider) => {
    'ngInject';

    $stateProfider
      .state('certificates', {
        parent: 'app',
        url: '/certificates',
        component: 'certificates',
        params: {
          filter: {
            value: 'none',
          },
        },
        resolve: {
          certificates(CertificatesService) {
            'ngInject';

            return CertificatesService.getCertificatesList();
          },
        },
      });
  })
  .name;

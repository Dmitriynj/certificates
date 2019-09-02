import uiRouter from '@uirouter/angularjs';
import { certificatesComponent } from './certificates.component';
import { certificateTagsFilter } from './certificates.tag.filter';
import { PagerService } from './certificates.pager.service';
import { UserService } from "../../../common/services/user.service";
import { allCertificates } from './allcertificates';
import 'ngstorage/ngStorage.min'

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
          allCertificates: async CertificateService => {
            'ngInject';

            return await CertificateService.getAllCertificates();
          },
        }
      });


  })
  .run(($rootScope, $localStorage) => {
    'ngInject';

      // $localStorage.globals = {
      //   certificates: allCertificates()
      // };
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
  .service('PagerService', PagerService)
  .name;

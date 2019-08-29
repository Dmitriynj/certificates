import { navComponent } from './app-nav.component';

export const appNav = angular
  .module('common.app-nav', [])
  .component('appNav', navComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app', {
        redirectTo: 'certificates',
        url: '/app',
        data: {
          requireAuth: true
        },
        component:'appNav'
      })
  })
  .name;

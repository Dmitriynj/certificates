import loader from 'angular-loading-bar';
import { appNav } from './app-nav/app-nav.module';
import { commonComponent } from './common.component';
import uiRouter from '@uirouter/angularjs';

export const common = angular
  .module('common', [
    loader,
    appNav,
    uiRouter
  ])
  .component('commonComponent', commonComponent)
  .config(($stateProvider) => {
    'ngInject';

    $stateProvider
      .state('app', {
        redirectTo: 'certificates',
        url: '/app',
        data: {
          requireAuth: true
        },
        component:'commonComponent'
      })
  })
  .run(($transitions, cfpLoadingBar) => {
    'ngInject';

    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  })
  .name;

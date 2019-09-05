import uiRouter from '@uirouter/angularjs';
import { loginComponent } from './login.component';

export const login = angular
  .module('components.auth.login', [
    uiRouter,
    'ngCookies'
  ])
  .component('login', loginComponent)
  .config(config)
  .name;

config.$inject = ['$stateProvider', '$urlRouterProvider'];
function config($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('auth', {
      // redirectTo: 'auth.login',
      url: '/auth',
      template: '<div ui-view></div>',
    })
    .state('auth.login', {
      url: '/login',
      component: 'login',
    });

  $urlRouterProvider.otherwise('/auth/login');
}

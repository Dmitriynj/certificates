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

config.$inject = ['$stateProvider', '$urlRouterProvider', 'stateConst', 'componentConst'];
function config($stateProvider, $urlRouterProvider, stateConst, componentConst) {

  $stateProvider
    .state(stateConst.AUTH.name, {
      redirectTo: stateConst.AUTH_LOGIN.name,
      url: stateConst.AUTH.url,
      template: '<div ui-view></div>',
    })
    .state(stateConst.AUTH_LOGIN.name, {
      url: stateConst.AUTH_LOGIN.url,
      component: componentConst.LOGIN,
    });

  $urlRouterProvider.otherwise(stateConst.AUTH.url + stateConst.AUTH_LOGIN.url);
}

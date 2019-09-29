import uiRouter from '@uirouter/angularjs';
import { registerComponent } from './register.component';

export const register = angular
  .module('components.auth.register', [
    uiRouter,
  ])
  .component('register', registerComponent)
  .config(config)
  .name;

config.$inject = ['$stateProvider', 'stateConst', 'componentConst'];
function config($stateProvider, stateConst, componentConst) {

  $stateProvider
    .state(stateConst.AUTH_REGISTRATION.name, {
      url: stateConst.AUTH_REGISTRATION.url,
      component: componentConst.REGISTER,
    });
}

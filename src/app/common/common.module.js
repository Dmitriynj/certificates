import loader from 'angular-loading-bar';
import {appNav} from './app-nav/app-nav.module';
import {commonComponent} from './common.component';
import uiRouter from '@uirouter/angularjs';
import {UserService} from './services/user.service';
import {pagination} from "./pagination/pagination.module";
import { lang } from "./lang/language.module";
import { confirmModal } from './confirm-modal/confirm-modal.module'
import {ngReallyClickDirective} from "./directives/ng.really.click";

export const common = angular
  .module('common', [
    loader,
    appNav,
    pagination,
    uiRouter,
    lang,
    confirmModal
  ])
  .component('commonComponent', commonComponent)
  .config(config)
  .run(run)
  .service('UserService', UserService)
  .directive('ngReallyClick', ngReallyClickDirective)
  .name;


config.$inject = ['$stateProvider'];
function config($stateProvider) {

  $stateProvider
    .state('app', {
      redirectTo: 'certificates',
      url: '/app',
      data: {
        requireAuth: true
      },
      component: 'commonComponent'
    })
}

run.$inject = ['$transitions', 'cfpLoadingBar'];
function run($transitions, cfpLoadingBar) {

  $transitions.onStart({}, cfpLoadingBar.start);
  $transitions.onSuccess({}, cfpLoadingBar.complete);
}

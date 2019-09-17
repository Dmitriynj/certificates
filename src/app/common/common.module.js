import loader from 'angular-loading-bar';
import { appNav } from './components/app-nav/app-nav.module';
import { commonComponent } from './common.component';
import uiRouter from '@uirouter/angularjs';
import { UserService } from './services/user.service';
import {pagination} from "./components/pagination/pagination.module";
import { lang } from "./components/lang/language.module";
import {ngReallyClickDirective} from "./directives/ng-really-click.directive";
import { formField } from "./components/form-field/form-field.module";
import uiValidate from 'angular-ui-validate'
import {confirmModal} from "./components/confirm-modal/confirm-modal.module";

export const common = angular
  .module('common', [
    loader,
    uiValidate,
    appNav,
    pagination,
    uiRouter,
    lang,
    formField,
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

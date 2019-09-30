import loader from 'angular-loading-bar';
import { appNav } from './components/app-nav/app-nav.module';
import { commonComponent } from './common.component';
import uiRouter from '@uirouter/angularjs';
import {pagination} from "./components/pagination/pagination.module";
import { lang } from "./components/lang/language.module";
import { formField } from "./components/form-field/form-field.module";
import uiValidate from 'angular-ui-validate'
import {confirmModal} from "./components/confirm-modal/confirm-modal.module";
import {stateConst} from "./constants/state.constant";
import {componentConst} from "./constants/component.constant";
import {appConst} from "./constants/app.constant";

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
  .component('common', commonComponent)
  .config(config)
  .run(run)
  .constant('stateConst', stateConst)
  .constant('componentConst', componentConst)
  .constant('appConst', appConst)
  .name;

config.$inject = ['$stateProvider', 'cfpLoadingBarProvider', 'stateConst', 'componentConst'];
function config($stateProvider, cfpLoadingBarProvider, stateConst, componentConst) {

  cfpLoadingBarProvider.latencyThreshold = 10;

  $stateProvider
    .state(stateConst.APP.name, {
      redirectTo: stateConst.CERTIFICATES.name,
      url: stateConst.APP.url,
      data: {
        requireAuth: true
      },
      component: componentConst.COMMON
    })
}

run.$inject = ['$transitions', 'cfpLoadingBar'];
async function run($transitions, cfpLoadingBar) {

  $transitions.onStart({}, cfpLoadingBar.start);
  $transitions.onSuccess({}, cfpLoadingBar.complete);
}

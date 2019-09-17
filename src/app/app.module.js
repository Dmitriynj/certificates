import angular from 'angular';
import '../style/app.css';
import '../style/_loading-bar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import uiRouter from '@uirouter/angularjs';
import { appComponent } from './app.component';
import { common } from './common/common.module';
import { components } from "./components/components.module";
import 'angular-cookies';
import 'angularjs-datepicker';
import 'angularjs-datepicker/src/css/angular-datepicker.css';

import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-sanitize';

export const app = angular
  .module('app', [
    uiRouter,
    'ngCookies',
    common,
    components,
    '720kb.datepicker',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize'
  ])
  .component('app', appComponent)
  .config(config);

config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function config($stateProvider, $locationProvider, $urlRouterProvider) {

  $locationProvider.html5Mode(true);
}


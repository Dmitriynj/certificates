import angular from 'angular';
import '../style/app.css';
import '../style/_loading-bar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'popper.js/dist/popper';
// import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import uiRouter from '@uirouter/angularjs';
import { appComponent } from './app.component';
import { common } from './common/common.module';
import { components } from "./components/components.module";
import 'angular-cookies';


export const app = angular
  .module('app', [
    uiRouter,
    'ngCookies',
    common,
    components
  ])
  .component('app', appComponent)
  .config(($stateProvider, $locationProvider, $urlRouterProvider) => {
    'ngInject';

    $locationProvider.html5Mode(true);
  });


import loader from 'angular-loading-bar';
import { appNav } from './app-nav/app-nav.module';

export const common = angular
  .module('common', [
    loader,
    appNav
  ])
  .run(($transitions, cfpLoadingBar) => {
    'ngInject';

    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  })
  .name;

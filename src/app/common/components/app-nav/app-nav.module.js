import { navComponent } from './app-nav.component';

export const appNav = angular
  .module('common.app-nav', [])
  .component('appNav', navComponent)
  .name;
